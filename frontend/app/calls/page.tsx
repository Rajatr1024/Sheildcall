"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CallsPage() {
  const [calls, setCalls] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/calls")
      .then((res) => res.json())
      .then(setCalls);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Call History
        </h1>

        <div className="bg-white rounded-2xl shadow">
          {calls.map((call) => (
            <Link
              key={call.id}
              href={`/?id=${call.id}`}
              className="flex justify-between p-4 border-b hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">
                  {call.filename}
                </p>
                <p className="text-sm text-gray-500">
                  {call.date}
                </p>
              </div>

              <div className="flex gap-4">

                <span
                  className={`px-3 py-1 rounded text-xs ${
                    call.risk_level === "high"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {call.risk_level}
                </span>

                <span className="text-sm">
                  {call.sentiment}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}