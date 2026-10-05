import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAdminArtworkById,
  updateAdminArtwork,
  createAdminArtwork,
} from "../services/adminArtworksService";

const CATEGORIES = [
  {
    id: "8791cbfa-b68b-4fcb-a8a5-f2c22d995489",
    name: "Óleo",
  },
  {
    id: "f2367ac8-51c4-45f2-9be7-817efb071452",
    name: "Acuarela",
  },
];

const EMPTY_FORM = {
  title: "",
  year: "",
  technique: "",
  dimensions: "",
  category_id: CATEGORIES[0].id,
  order_index: "",
  is_visible: true,
  original_image_url: "",
  optimized_image_url: "",
  thumbnail_image_url: "",
};

function AdminArtworkForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(
    isEditing ? null : EMPTY_FORM
  );
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    async function loadArtwork() {
      try {
        setError("");

        const data = await getAdminArtworkById(id);

        setFormData({
          title: data.title || "",
          year: data.year || "",
          technique: data.technique || "",
          dimensions: data.dimensions || "",
          category_id: data.category_id || CATEGORIES[0].id,
          order_index: data.order_index ?? "",
          is_visible: data.is_visible,
          original_image_url: data.original_image_url || "",
          optimized_image_url: data.optimized_image_url || "",
          thumbnail_image_url: data.thumbnail_image_url || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadArtwork();
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setNewImage(null);
      return;
    }

    setNewImage(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSaving(true);

      const artworkData = {
        ...formData,
        image: newImage,
      };

      if (isEditing) {
        await updateAdminArtwork(id, artworkData);
      } else {
        if (!newImage) {
          throw new Error(
            "Seleccioná una imagen para crear la obra."
          );
        }

        await createAdminArtwork(artworkData);
      }

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

  const currentImage =
    formData.thumbnail_image_url ||
    formData.optimized_image_url ||
    formData.original_image_url;

  return (
    <section>
      <h1>{isEditing ? "Editar obra" : "Nueva obra"}</h1>

      {isEditing && currentImage && (
        <img
          src={currentImage}
          alt={formData.title}
          width="200"
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
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
            required
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
          <label htmlFor="category_id">Categoría</label>

          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
          <label htmlFor="image">
            {isEditing ? "Reemplazar imagen" : "Imagen"}
          </label>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEditing}
          />

          {newImage && (
            <p>Imagen seleccionada: {newImage.name}</p>
          )}

          {isEditing && (
            <p>
              Si no seleccionás una imagen nueva, se conservará la actual.
            </p>
          )}
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
          {saving
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Crear obra"}
        </button>
      </form>
    </section>
  );
}

export default AdminArtworkForm;