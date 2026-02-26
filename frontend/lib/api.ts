export async function fetchCallData(id: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/call/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch call data");
  }

  return res.json();
}