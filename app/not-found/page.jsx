"use client"; // MUST be first

import React from "react";
import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("ref") || "unknown";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-700 mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      {referrer && (
        <p className="text-gray-500">You came here from: {referrer}</p>
      )}
    </div>
  );
}
