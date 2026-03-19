"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callId = searchParams.get("id");

  useEffect(() => {
    if (!callId) {
      router.push("/");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/call/${callId}`
        );

        const data = await res.json();

        if (data.status === "completed") {
          clearInterval(interval);
          router.push(`/?id=${callId}`);
        }

        if (data.status === "failed") {
          clearInterval(interval);
          alert("Processing failed");
          router.push("/");
        }

      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [callId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      
      <div className="text-lg font-medium text-gray-700">
        Processing your call...
      </div>

      <div className="text-sm text-gray-500">
        This may take a few seconds
      </div>

      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

    </div>
  );
}