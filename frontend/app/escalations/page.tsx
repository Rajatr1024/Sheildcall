import Link from "next/link";
import { fetchEscalations } from "@/lib/api";

export default async function EscalationsPage() {

  const calls = await fetchEscalations();

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Escalation Queue
        </h1>

        {calls.length === 0 && (
          <p>No high-risk calls detected.</p>
        )}

        <div className="space-y-4">

          {calls.map((call: any) => (

            <Link
              key={call.id}
              href={`/?id=${call.id}`}
              className="block bg-white p-4 rounded-xl shadow"
            >

              <div className="flex justify-between">

                <div>
                  <p className="font-semibold">
                    {call.summary}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(call.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-red-600 font-bold">
                  HIGH RISK
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}