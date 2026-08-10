const API_URL = import.meta.env.VITE_API_URL;

export async function getArtworks() {
  const response = await fetch(`${API_URL}/api/artworks`);

  if (!response.ok) {
    throw new Error('No se pudieron obtener las obras.');
  }

  const result = await response.json();

  return result.data;
}