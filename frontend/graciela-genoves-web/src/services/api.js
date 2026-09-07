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

export async function getExhibitions() {
  const response = await fetch(`${API_URL}/api/exhibitions`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las exposiciones.");
  }

  const result = await response.json();

  return result.data;
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "No se pudo iniciar sesión.");
  }

  return result.data;
}