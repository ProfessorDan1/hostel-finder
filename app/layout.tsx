import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hostel Connect",
  description:
    "Find hostels and roommates around campus - no login required",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-3xl mx-auto p-4">
          {/* 🔹 New Branding Header */}
          <div className="text-center text-xs sm:text-sm text-gray-500 mb-2 tracking-wide">
            Powered by{" "}
            <span className="font-semibold text-green-700">
              Danova Technologies
            </span>
          </div>

          {/* 🔹 Main Header */}
          <header className="py-6 text-center">
            <h1 className="text-3xl font-bold text-green-800">
              HostelConnect
            </h1>
            <p className="text-sm text-green-700">
              Find hostels or roommates around otto/ijanikin campus-  
            </p>
          </header>

          <main>{children}</main>

          <footer className="mt-12 text-center text-sm text-gray-500">
            © Danova Technologies
          </footer>
        </div>
      </body>
    </html>
  );
}
