import Link from "next/link";
import { fetchCalls } from "@/lib/api";

export default async function CallsPage() {
  const calls = await fetchCalls();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Call History
      </h1>

      <div className="space-y-4">
        {calls.map((call: any) => (
          <Link
            key={call.id}
            href={`/?id=${call.id}`}
            className="block bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {call.summary?.slice(0, 80)}...
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(call.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm">
                  Risk: {call.risk_level}
                </p>
                <p className="text-sm">
                  Sentiment: {call.sentiment}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}