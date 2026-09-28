const API_URL = import.meta.env.VITE_API_URL;

export async function getAdminArtworks() {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_URL}/api/artworks/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "No se pudieron obtener las obras."
    );
  }

  return result.data;
}

export async function updateArtworkVisibility(id, isVisible) {
  const token = localStorage.getItem("admin_token");

  const formData = new FormData();
  formData.append("is_visible", String(isVisible));

  const response = await fetch(`${API_URL}/api/artworks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "No se pudo actualizar la obra."
    );
  }

  return result.data;
}

export async function getAdminArtworkById(id) {
    const token = localStorage.getItem("admin_token");
  
    const response = await fetch(`${API_URL}/api/artworks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(
        result.message || "No se pudo obtener la obra."
      );
    }
  
    return result.data;
  }

  export async function updateAdminArtwork(id, artworkData) {
    const token = localStorage.getItem("admin_token");
  
    const formData = new FormData();
  
    formData.append("title", artworkData.title);
    formData.append("year", artworkData.year);
    formData.append("technique", artworkData.technique);
    formData.append("dimensions", artworkData.dimensions);
    formData.append("order_index", artworkData.order_index);
    formData.append("is_visible", String(artworkData.is_visible));
  
    const response = await fetch(`${API_URL}/api/artworks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(
        result.message || "No se pudo actualizar la obra."
      );
    }
  
    return result.data;
  }