import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAdminArtworks,
  updateArtworkVisibility,
} from "../services/adminArtworksService";

function AdminArtworks() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await getAdminArtworks();
        setArtworks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArtworks();
  }, []);

  async function handleVisibility(artwork) {
    try {
      setError("");
      setUpdatingId(artwork.id);

      const updatedArtwork = await updateArtworkVisibility(
        artwork.id,
        !artwork.is_visible
      );

      setArtworks((currentArtworks) =>
        currentArtworks.map((item) =>
          item.id === artwork.id
            ? {
                ...item,
                is_visible: updatedArtwork.is_visible,
              }
            : item
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p>Cargando obras...</p>;
  }

  if (error && artworks.length === 0) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Obras</h1>

      <button type="button">
        Nueva obra
      </button>

      {error && <p>{error}</p>}

      {artworks.length === 0 ? (
        <p>No hay obras cargadas.</p>
      ) : (
        <div>
          {artworks.map((artwork) => (
            <div key={artwork.id}>
              <img
                src={
                  artwork.thumbnail_image_url ||
                  artwork.optimized_image_url ||
                  artwork.original_image_url
                }
                alt={artwork.title}
                width="120"
              />

              <h2>{artwork.title}</h2>

              <p>
                {artwork.category?.slug === "oleos"
                  ? "Óleo"
                  : artwork.category?.slug === "acuarelas"
                  ? "Acuarela"
                  : artwork.category?.slug}
              </p>

              <p>Año: {artwork.year}</p>

              <p>Orden: {artwork.order_index}</p>

              <p>
                Estado:{" "}
                {artwork.is_visible ? "Visible" : "Oculta"}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/admin/obras/${artwork.id}/editar`)
                }
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => handleVisibility(artwork)}
                disabled={updatingId === artwork.id}
              >
                {updatingId === artwork.id
                  ? "Guardando..."
                  : artwork.is_visible
                  ? "Ocultar"
                  : "Mostrar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminArtworks;