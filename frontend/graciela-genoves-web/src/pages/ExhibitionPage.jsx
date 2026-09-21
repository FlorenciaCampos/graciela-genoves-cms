import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExhibitionBySlug } from "../services/api";
import "../styles/ExhibitionPage.css";

function ExhibitionPage() {
  const { slug } = useParams();

  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  const exhibitionImages =
    exhibition?.exhibition_images?.map((image) => ({
      id: `exhibition-${image.id}`,
      imageUrl: image.image_url,
      fullImageUrl: image.image_url,
      alt: image.caption || exhibition.title,
    })) || [];

  const exhibitionArtworks =
    exhibition?.exhibition_artworks
      ?.filter((item) => item.artworks)
      .map((item) => ({
        id: `artwork-${item.artworks.id}`,
        imageUrl:
          item.artworks.thumbnail_image_url ||
          item.artworks.optimized_image_url,
        fullImageUrl: item.artworks.optimized_image_url,
        alt: item.artworks.title,
      })) || [];

  const galleryItems = [
    ...exhibitionImages,
    ...exhibitionArtworks,
  ];

  const closeCarousel = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0
        ? galleryItems.length - 1
        : currentIndex - 1
    );
  }, [galleryItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === galleryItems.length - 1
        ? 0
        : currentIndex + 1
    );
  }, [galleryItems.length]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCarousel();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedIndex,
    closeCarousel,
    showPrevious,
    showNext,
  ]);

  if (loading) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!exhibition) {
    return <p>Exhibición no encontrada.</p>;
  }

  const selectedItem =
    selectedIndex !== null
      ? galleryItems[selectedIndex]
      : null;

  return (
    <>
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
                <strong>Curaduría:</strong>{" "}
                {exhibition.curator}
              </p>
            )}
          </div>

          {exhibition.short_description && (
            <p className="exhibition-page__description">
              {exhibition.short_description}
            </p>
          )}

          {(exhibition.curatorial_pdf_url ||
            exhibition.catalog_pdf_url) && (
            <div className="exhibition-page__downloads">
              {exhibition.curatorial_pdf_url && (
                <a
                  className="exhibition-page__download-link"
                  href={exhibition.curatorial_pdf_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Descargar texto curatorial ↓
                </a>
              )}

              {exhibition.catalog_pdf_url && (
                <a
                  className="exhibition-page__download-link"
                  href={exhibition.catalog_pdf_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Descargar catálogo ↓
                </a>
              )}
            </div>
          )}
        </div>

        {galleryItems.length > 0 && (
          <div className="exhibition-page__gallery">
            {galleryItems.map((item, index) => (
              <figure
                className="exhibition-page__image-container"
                key={item.id}
              >
                <button
                  className="exhibition-page__image-button"
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label="Ver imagen ampliada"
                >
                  <img
                    className="exhibition-page__image"
                    src={item.imageUrl}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </figure>
            ))}
          </div>
        )}
      </section>

      {selectedItem && (
        <div className="exhibition-page__lightbox">
          <button
            className="exhibition-page__close"
            type="button"
            onClick={closeCarousel}
            aria-label="Cerrar"
          >
            ×
          </button>

          <button
            className="exhibition-page__arrow exhibition-page__arrow--left"
            type="button"
            onClick={showPrevious}
            aria-label="Imagen anterior"
          >
            ←
          </button>

          <div className="exhibition-page__lightbox-content">
            <img
              className="exhibition-page__lightbox-image"
              src={selectedItem.fullImageUrl}
              alt={selectedItem.alt}
            />
          </div>

          <button
            className="exhibition-page__arrow exhibition-page__arrow--right"
            type="button"
            onClick={showNext}
            aria-label="Imagen siguiente"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}

export default ExhibitionPage;