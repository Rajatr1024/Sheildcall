"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/latest"
        );

        if (res.ok) {
          router.push("/");
        }
      } catch {}

    }, 5000); // check every 5s

    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow text-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />

        <h2 className="text-xl font-semibold">
          Processing Call...
        </h2>

        <p className="text-gray-500">
          AI is analyzing the conversation
        </p>
      </div>
    </main>
  );
}