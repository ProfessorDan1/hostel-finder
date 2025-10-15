import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'Find hostels and roommates around campus - no login required',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-3xl mx-auto p-4">
          <header className="py-6 text-center">
            <h1 className="text-3xl font-bold text-green-800">CampusConnect</h1>
            <p className="text-sm text-green-700">Find hostels or roommates around campus — no login required</p>
          </header>
          <main>{children}</main>
          <footer className="mt-12 text-center text-sm text-gray-500">© CampusConnect</footer>
        </div>
      </body>
    </html>
  )
}
