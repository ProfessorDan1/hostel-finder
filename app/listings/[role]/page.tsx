"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type RoleType = "find_hostel" | "find_roommate" | "hostel_requests";

export default function ListingsPage({ params }: any) {
  const role = params.role as RoleType;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map role → formType in DB
  const roleMap: Record<RoleType, string> = {
    find_hostel: "post-apartment", // view available hostels
    find_roommate: "find-roommate", // roommate requests
    hostel_requests: "find-hostel", // students' hostel requests
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formType = roleMap[role];
        if (!formType) return;

        const res = await fetch(`/api/listings?formType=${formType}`);
        const json = await res.json();

        if (json.success) setData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  // 🌿 Modern Loading Spinner
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-green-700 font-medium text-lg">
          Fetching listings...
        </p>
      </div>
    );

  const titleMap: Record<RoleType, string> = {
    find_hostel: "Available Hostels",
    find_roommate: "Roommate Requests",
    hostel_requests: "Students’ Hostel Requests",
  };

  const noDataMessage: Record<RoleType, string> = {
    find_hostel: "No hostels available at the moment.",
    find_roommate: "No roommate requests yet.",
    hostel_requests: "No student hostel requests found.",
  };

  const postLink =
    role === "find_hostel"
      ? "/post/find-hostel"
      : role === "find_roommate"
      ? "/post/find-roommate"
      : "/post/find-hostel";

  // 💬 WhatsApp Number (replace with yours)
  const whatsappNumber = "2349012345678";

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
        {titleMap[role] || "Listings"}
      </h1>

      {/* LISTINGS GRID */}
      {data.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          {noDataMessage[role]}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((r, i) => {
            const idNumber = i + 1;
            const whatsappMessage = encodeURIComponent(
              `Hello, I am interested in listing #${idNumber} on CampusConnect.`
            );
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            return (
              <div
                key={r.id}
                className="border border-green-200 rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                {/* Listing Number */}
                <p className="text-sm text-green-500 font-semibold mb-1">
                  #{idNumber}
                </p>

                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  {r.type} — {r.gender}
                </h3>

                <p className="text-sm text-gray-700 mb-1">📍 {r.location}</p>
                {r.religion && (
                  <p className="text-sm text-gray-700 mb-1">🙏 {r.religion}</p>
                )}
                {r.rent && (
                  <p className="text-sm text-gray-700 mb-1">💰 {r.rent}</p>
                )}
                {/* Removed phone number */}
                <p className="text-sm text-gray-700 mb-1">👤 {r.name}</p>
                <p className="text-sm text-gray-600 mt-2">{r.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Posted on {new Date(r.created_at).toLocaleDateString()}
                </p>

                {/* WhatsApp Connect Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  💬 Connect via WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* CALL TO ACTION SECTION */}
      <div className="mt-16 text-center bg-green-50 p-8 rounded-xl border border-green-200">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          Didn’t find what you’re looking for?
        </h2>
        <p className="text-gray-600 mb-4">
          Tell us exactly what kind of hostel or roommate you need — we’ll help
          you find it.
        </p>
        <Link
          href={postLink}
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          🏠 Post What You’re Looking For
        </Link>
      </div>
    </div>
  );
}
