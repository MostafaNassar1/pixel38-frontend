const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string | null;
  traits: { label: string; positive: boolean }[] | null;
  isActive: boolean;
  images: { id: string; imageUrl: string; order: number }[];
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/public/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}


export async function adminFetch(
  path: string,
  accessToken: string,
  options: RequestInit = {},
) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}