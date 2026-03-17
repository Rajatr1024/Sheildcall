"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    console.log("Response:", res);

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    console.log("Success:", data);

    alert("Upload successful!");

    // redirect
    router.push("/processing");

  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed");
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-96 space-y-4">
        <h1 className="text-xl font-semibold">
          Upload Call Audio
        </h1>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </main>
  );
}