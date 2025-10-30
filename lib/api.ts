export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiGet(path: string) {
  try {
    const res = await fetch(`${API_URL}${path}`);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`[apiGet] Error fetching ${path}:`, error);
    throw error;
  }
}
