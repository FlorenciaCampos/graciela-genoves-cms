import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAdminArtworkById,
  updateAdminArtwork,
} from "../services/adminArtworksService";

function AdminArtworkForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtwork() {
      try {
        setError("");

        const data = await getAdminArtworkById(id);

        setFormData({
          title: data.title || "",
          year: data.year || "",
          technique: data.technique || "",
          dimensions: data.dimensions || "",
          order_index: data.order_index ?? "",
          is_visible: data.is_visible,
          original_image_url: data.original_image_url,
          optimized_image_url: data.optimized_image_url,
          thumbnail_image_url: data.thumbnail_image_url,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArtwork();
  }, [id]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSaving(true);

      await updateAdminArtwork(id, formData);

      navigate("/admin/obras");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Cargando obra...</p>;
  }

  if (error && !formData) {
    return <p>{error}</p>;
  }

  if (!formData) {
    return <p>No se encontró la obra.</p>;
  }

  return (
    <section>
      <h1>Editar obra</h1>

      <img
        src={
          formData.thumbnail_image_url ||
          formData.optimized_image_url ||
          formData.original_image_url
        }
        alt={formData.title}
        width="200"
      />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="year">Año</label>
          <input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="technique">Técnica</label>
          <input
            id="technique"
            name="technique"
            type="text"
            value={formData.technique}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dimensions">Dimensiones</label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            value={formData.dimensions}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="order_index">Orden</label>
          <input
            id="order_index"
            name="order_index"
            type="number"
            value={formData.order_index}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="is_visible">
            <input
              id="is_visible"
              name="is_visible"
              type="checkbox"
              checked={formData.is_visible}
              onChange={handleChange}
            />
            Visible
          </label>
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}

export default AdminArtworkForm;