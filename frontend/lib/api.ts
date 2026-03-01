// export async function fetchCallData(id: string) {
//   const res = await fetch(
//     `http://127.0.0.1:8000/call/${id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch call data");
//   }

//   return res.json();
// }


export async function fetchCalls() {
  const res = await fetch("http://localhost:8000/calls", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch calls");
  }

  return res.json();
}

export async function fetchCallData(id: string) {
  const url =
    id === "latest"
      ? "http://localhost:8000/latest"
      : `http://localhost:8000/call/${id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch call");
  }

  return res.json();
}

export async function fetchLatest() {
  const res = await fetch("http://localhost:8000/latest", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch latest call");
  }

  return res.json();
}