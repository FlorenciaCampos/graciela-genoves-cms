
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAdminArtworkById,
  updateAdminArtwork,
  createAdminArtwork,
} from "../services/adminArtworksService";

import imgAdmin from "../../assets/img-admin.jpg";
import "../styles/AdminArtworkForm.css";

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
  is_visible: true,
  original_image_url: "",
  optimized_image_url: "",
  thumbnail_image_url: "",
};

function AdminArtworkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const previewUrlRef = useRef(null);

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(
    isEditing ? null : { ...EMPTY_FORM }
  );

  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // CARGAR OBRA PARA EDITAR

  useEffect(() => {
    if (!isEditing) return;

    let active = true;

    async function loadArtwork() {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminArtworkById(id);

        if (!active) return;

        setFormData({
          title: data.title || "",
          year: data.year ?? "",
          technique: data.technique || "",
          dimensions: data.dimensions || "",
          category_id:
            data.category_id || CATEGORIES[0].id,
          is_visible: data.is_visible ?? true,
          original_image_url:
            data.original_image_url || "",
          optimized_image_url:
            data.optimized_image_url || "",
          thumbnail_image_url:
            data.thumbnail_image_url || "",
        });
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadArtwork();

    return () => {
      active = false;
    };
  }, [id, isEditing]);

  // LIBERAR LA VISTA PREVIA AL SALIR DEL FORMULARIO
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function clearPreview() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
  }

  // MODIFICAR CAMPOS

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // SELECCIONAR IMAGEN

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Seleccioná un archivo de imagen válido.");
      event.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreviewUrl(objectUrl);
    setNewImage(file);
    setError("");
  }

  // CANCELAR SELECCIÓN DE IMAGEN

  function handleCancelImage() {
    setNewImage(null);
    clearPreview();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // GUARDAR CAMBIOS

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

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
          throw new Error("Seleccioná una imagen para crear la obra.");
        }
        await createAdminArtwork(artworkData);
      }

      navigate("/admin/obras", {
        replace: true,
        state: {
          success: "Los cambios se guardaron correctamente.",
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="admin-artwork-loading">
        Cargando obra...
      </p>
    );
  }

  if (error && !formData) {
    return (
      <p className="admin-artwork-loading">
        {error}
      </p>
    );
  }

  if (!formData) {
    return (
      <p className="admin-artwork-loading">
        No se encontró la obra.
      </p>
    );
  }

  const currentImage =
    formData.optimized_image_url ||
    formData.original_image_url ||
    formData.thumbnail_image_url;

  const displayedImage =
    previewUrl ||
    (isEditing && currentImage
      ? currentImage
      : imgAdmin);

  return (
    <main className="admin-artwork-page">
      <section className="admin-artwork-form-panel">
        <button
          type="button"
          className="admin-artwork-back"
          onClick={() => navigate("/admin/obras")}
        >
          ← Volver a obras
        </button>

        <header className="admin-artwork-header">
          <p className="admin-artwork-eyebrow">
            GRACIELA GENOVÉS · ADMIN
          </p>

          <h1>
            {isEditing ? "Editar obra" : "Nueva obra"}
          </h1>

          <p>
            {isEditing
              ? "Modificá la información de la obra."
              : "Completá la información para incorporar una nueva obra."}
          </p>
        </header>

        <form
          className="admin-artwork-form"
          onSubmit={handleSubmit}
        >
          {/* TÍTULO */}

          <div className="admin-artwork-field admin-artwork-field-full">
            <label htmlFor="title">Título</label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nombre de la obra"
              required
            />
          </div>

          {/* AÑO Y TÉCNICA */}

          <div className="admin-artwork-row">
            <div className="admin-artwork-field">
              <label htmlFor="year">Año</label>

              <input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="Ej. 2026"
                required
              />
            </div>

            <div className="admin-artwork-field">
              <label htmlFor="technique">
                Técnica
              </label>

              <input
                id="technique"
                name="technique"
                type="text"
                value={formData.technique}
                onChange={handleChange}
                placeholder="Ej. Óleo sobre tela"
                required
              />
            </div>
          </div>

          {/* DIMENSIONES */}

          <div className="admin-artwork-field admin-artwork-field-full">
            <label htmlFor="dimensions">
              Dimensiones
            </label>

            <input
              id="dimensions"
              name="dimensions"
              type="text"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Ej. 60 × 80 cm"
              required
            />
          </div>

          {/* CATEGORÍA */}

          <div className="admin-artwork-field admin-artwork-field-full">
            <label htmlFor="category_id">
              Categoría
            </label>

            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              {CATEGORIES.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGEN */}

          <div className="admin-artwork-field admin-artwork-field-full">
            <label htmlFor="image">
              {isEditing
                ? "Reemplazar imagen"
                : "Imagen"}
            </label>

            <label
              className="admin-artwork-upload"
              htmlFor="image"
            >
              <span className="admin-artwork-upload-symbol">
                ＋
              </span>

              <strong>
                {newImage
                  ? newImage.name
                  : isEditing
                    ? "Seleccionar una nueva imagen"
                    : "Seleccionar imagen"}
              </strong>

              <span>
                {newImage
                  ? "La nueva imagen se muestra en la vista previa."
                  : isEditing
                    ? "Si no seleccionás otra, se conservará la actual."
                    : "Elegí la imagen de la obra desde tu computadora."}
              </span>
            </label>

            <input
              ref={fileInputRef}
              className="admin-artwork-file-input"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEditing && !newImage}
            />

            {newImage && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  role="status"
                  style={{
                    fontSize: "13px",
                    color: "#303030",
                  }}
                >
                  ✓ Nueva imagen seleccionada
                </span>

                <button
                  type="button"
                  onClick={handleCancelImage}
                  disabled={saving}
                  style={{
                    padding: 0,
                    background: "none",
                    border: "none",
                    color: "#777",
                    fontSize: "12px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Cancelar selección
                </button>
              </div>
            )}
          </div>

          {/* VISIBILIDAD */}

          <label className="admin-artwork-visible">
            <input
              name="is_visible"
              type="checkbox"
              checked={formData.is_visible}
              onChange={handleChange}
            />

            <span>
              <strong>Visible</strong>
              <small>
                La obra se mostrará en el sitio web.
              </small>
            </span>
          </label>

          {/* MENSAJES */}

          {error && (
            <p className="admin-artwork-error" role="alert">
              {error}
            </p>
          )}

          {/* BOTONES */}

          <div className="admin-artwork-actions">
            <button
              className="admin-artwork-submit"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear obra"}
            </button>

            <button
              className="admin-artwork-cancel"
              type="button"
              onClick={() => navigate("/admin/obras")}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>

      {/* VISTA PREVIA */}

      <aside className="admin-artwork-image-panel">
        <img
          src={displayedImage}
          alt={
            previewUrl
              ? `Vista previa de la nueva imagen: ${formData.title}`
              : isEditing && formData.title
                ? formData.title
                : "Obra de Graciela Genovés"
          }
        />
      </aside>
    </main>
  );
}

export default AdminArtworkForm;
