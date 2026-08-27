import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExhibitionBySlug } from "../services/api";
import "../styles/ExhibitionPage.css";

function ExhibitionPage() {
  const { slug } = useParams();

  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExhibition() {
      try {
        setLoading(true);

        const data = await getExhibitionBySlug(slug);

        setExhibition(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la exhibición.");
      } finally {
        setLoading(false);
      }
    }

    loadExhibition();
  }, [slug]);

  if (loading) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!exhibition) {
    return <p>Exhibición no encontrada.</p>;
  }

  const exhibitionImages =
    exhibition.exhibition_images?.map((image) => ({
      id: `exhibition-${image.id}`,
      imageUrl: image.image_url,
      caption: image.caption,
      alt: image.caption || exhibition.title,
    })) || [];

  const exhibitionArtworks =
    exhibition.exhibition_artworks
      ?.filter((item) => item.artworks)
      .map((item) => ({
        id: `artwork-${item.artworks.id}`,
        imageUrl:
          item.artworks.thumbnail_image_url ||
          item.artworks.optimized_image_url,
        caption: item.artworks.title,
        alt: item.artworks.title,
      })) || [];

  const galleryItems = [
    ...exhibitionImages,
    ...exhibitionArtworks,
  ];

  return (
    <section className="exhibition-page">
      <div className="exhibition-page__info">
        <h1 className="exhibition-page__title">
          {exhibition.title}
        </h1>

        <div className="exhibition-page__details">
          {exhibition.year && <p>{exhibition.year}</p>}

          {exhibition.venue && <p>{exhibition.venue}</p>}

          {exhibition.curator && (
            <p>
              <strong>Curaduría:</strong> {exhibition.curator}
            </p>
          )}
        </div>

        {exhibition.short_description && (
          <p className="exhibition-page__description">
            {exhibition.short_description}
          </p>
        )}

        {exhibition.curatorial_pdf_url && (
          <a
            className="exhibition-page__curatorial-link"
            href={exhibition.curatorial_pdf_url}
            target="_blank"
            rel="noreferrer"
          >
            Descargar texto curatorial ↓
          </a>
        )}
      </div>

      {galleryItems.length > 0 && (
        <div className="exhibition-page__gallery">
          {galleryItems.map((item) => (
            <figure
              className="exhibition-page__image-container"
              key={item.id}
            >
              <img
                className="exhibition-page__image"
                src={item.imageUrl}
                alt={item.alt}
              />

              {item.caption && (
                <figcaption className="exhibition-page__caption">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExhibitionPage;