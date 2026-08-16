const API_URL = import.meta.env.VITE_API_URL;

export async function getArtworks(category) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/api/artworks${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener las obras.");
  }

  const result = await response.json();

  return result.data;
}