"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("http://127.0.0.1:8000/latest");
      const data = await res.json();

      if (data.status !== "processing") {
        router.push("/");
      }
      if (data.status === "failed") {
  alert("Processing failed");
  router.push("/");
}
    }, 2000);

    

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Processing your call...
    </div>
  );
}