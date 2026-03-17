"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CallsPage() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/calls")
      .then(res => res.json())
      .then(setCalls);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Call History</h1>

      <div className="space-y-4">
        {calls.map((call: any) => (
          <Link
            key={call.id}
            href={`/?id=${call.id}`}
            className="block bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{call.summary}</div>
                <div className="text-sm text-gray-500">
                  {new Date(call.date).toLocaleString()}
                </div>
              </div>

              <div className="text-sm font-medium">
                {call.risk_level}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}