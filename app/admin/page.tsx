'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [listings, setListings] = useState<any[]>([])
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchListings() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      if (!data.success) throw new Error()
      setListings(data.data)
    } catch {
      setError('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  async function fetchById() {
    if (!searchId) return fetchListings()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      if (!data.success) throw new Error()
      // search locally by id or form_type
      const filtered = data.data.filter(
        (l: any) =>
          l.id.toString() === searchId.trim() ||
          l.form_type?.toLowerCase() === searchId.trim().toLowerCase()
      )
      if (!filtered.length) throw new Error()
      setListings(filtered)
    } catch {
      setError('No listings found')
      setListings([])
    } finally {
      setLoading(false)
    }
  }

  async function deleteListing(id: number) {
    if (!confirm('Are you sure you want to delete this listing?')) return
   const res = await fetch(`/api/admin/listings?id=${id}`, { method: 'DELETE' })
const data = await res.json()
if (data.success) {
  alert('Listing deleted successfully')
  fetchListings()
} else {
  alert('Failed to delete listing')
}

    fetchListings()
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by ID or formType"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-3 py-2 rounded w-60"
        />
        <button
          onClick={fetchById}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={fetchListings}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Form Type</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l.id}>
              <td className="p-2 border">{l.id}</td>
              <td className="p-2 border">{l.form_type}</td>
              <td className="p-2 border">{l.type}</td>
              <td className="p-2 border">{l.location}</td>
              <td className="p-2 border">{l.gender}</td>
              <td className="p-2 border">{l.phone}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteListing(l.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {!listings.length && !loading && !error && (
            <tr>
              <td colSpan={7} className="text-center p-3">
                No listings available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
