
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAdminArtworks,
  updateArtworkVisibility,
} from "../services/adminArtworksService";

import "../styles/AdminArtworks.css";

function AdminArtworks() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState([]);
  const [filter, setFilter] = useState("todas");
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

  const filteredArtworks = artworks.filter((artwork) => {
    if (filter === "todas") return true;

    return artwork.category?.slug === filter;
  });

  const getCategoryName = (slug) => {
    if (slug === "oleos") return "Óleo";
    if (slug === "acuarelas") return "Acuarela";
    return slug || "Sin categoría";
  };

  if (loading) {
    return (
      <main className="admin-artworks-page">
        <p>Cargando obras...</p>
      </main>
    );
  }

  return (
    <main className="admin-artworks-page">
      <div className="admin-artworks-container">
        <button
          type="button"
          className="admin-artworks-back"
          onClick={() => navigate("/admin")}
        >
          ← Volver al panel
        </button>

        <header className="admin-artworks-header">
          <div>
            <p className="admin-artworks-eyebrow">
              GRACIELA GENOVÉS · ADMIN
            </p>

            <h1>Obras</h1>

            <p className="admin-artworks-description">
              Administrá las obras de óleo y acuarela.
            </p>
          </div>

          <button
            type="button"
            className="admin-artworks-new"
            onClick={() => navigate("/admin/obras/nueva")}
          >
            + Nueva obra
          </button>
        </header>

        <div className="admin-artworks-toolbar">
          <div className="admin-artworks-filters">
            <button
              type="button"
              className={filter === "todas" ? "active" : ""}
              onClick={() => setFilter("todas")}
            >
              Todas
            </button>

            <button
              type="button"
              className={filter === "oleos" ? "active" : ""}
              onClick={() => setFilter("oleos")}
            >
              Óleos
            </button>

            <button
              type="button"
              className={filter === "acuarelas" ? "active" : ""}
              onClick={() => setFilter("acuarelas")}
            >
              Acuarelas
            </button>
          </div>

          <span className="admin-artworks-count">
            {filteredArtworks.length} obras
          </span>
        </div>

        {error && (
          <p className="admin-artworks-error">{error}</p>
        )}

        {filteredArtworks.length === 0 ? (
          <div className="admin-artworks-empty">
            <p>No hay obras en esta categoría.</p>
          </div>
        ) : (
          <div className="admin-artworks-grid">
            {filteredArtworks.map((artwork) => {
              const image =
                artwork.thumbnail_image_url ||
                artwork.optimized_image_url ||
                artwork.original_image_url;

              return (
                <article
                  className={`admin-artworks-card ${
                    !artwork.is_visible ? "is-hidden" : ""
                  }`}
                  key={artwork.id}
                >
                  <div className="admin-artworks-image">
                    {image && (
                      <img src={image} alt={artwork.title} />
                    )}

                    {!artwork.is_visible && (
                      <span className="admin-artworks-hidden-label">
                        Oculta
                      </span>
                    )}
                  </div>

                  <div className="admin-artworks-card-content">
                    <span className="admin-artworks-category">
                      {getCategoryName(artwork.category?.slug)}
                    </span>

                    <h2>{artwork.title}</h2>

                    <p className="admin-artworks-details">
                      {artwork.year}
                      {artwork.technique
                        ? ` · ${artwork.technique}`
                        : ""}
                    </p>

                    <div className="admin-artworks-card-actions">
                      <button
                        type="button"
                        className="admin-artworks-edit"
                        onClick={() =>
                          navigate(
                            `/admin/obras/${artwork.id}/editar`
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="admin-artworks-visibility"
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
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminArtworks;
