
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getExhibitionBySlug } from "../services/api";
import useLanguage from "../context/useLanguage";
import "../styles/ExhibitionPage.css";

function ExhibitionPage() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const texts = {
    es: {
      back: "Volver a exposiciones",
      curator: "Curaduría",
      curatorialText: "Descargar texto curatorial",
      catalog: "Descargar catálogo",
      loading: "Cargando exposición...",
      error: "No se pudo cargar la exposición.",
      notFound: "Exposición no encontrada.",
      close: "Cerrar",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
      enlarge: "Ampliar imagen",
    },
    en: {
      back: "Back to exhibitions",
      curator: "Curated by",
      curatorialText: "Download curatorial text",
      catalog: "Download catalog",
      loading: "Loading exhibition...",
      error: "Could not load the exhibition.",
      notFound: "Exhibition not found.",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      enlarge: "Enlarge image",
    },
  };

  const t = texts[language] || texts.es;

  useEffect(() => {
    let active = true;

    async function loadExhibition() {
      try {
        setLoading(true);
        setSelectedIndex(null);

        const data = await getExhibitionBySlug(slug);

        if (active) {
          setExhibition(data);
          setError(null);
        }
      } catch (err) {
        console.error(err);

        if (active) {
          setError("error");
          setExhibition(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadExhibition();

    return () => {
      active = false;
    };
  }, [slug]);

  const title = exhibition
    ? language === "en"
      ? exhibition.title_en ||
        exhibition.title_es ||
        exhibition.title
      : exhibition.title_es ||
        exhibition.title
    : "";

  const description = exhibition
    ? language === "en"
      ? exhibition.short_description_en ||
        exhibition.short_description_es ||
        exhibition.short_description
      : exhibition.short_description_es ||
        exhibition.short_description
    : "";

  const exhibitionImages =
    exhibition?.exhibition_images?.map((image) => ({
      id: `exhibition-${image.id}`,
      imageUrl: image.image_url,
      fullImageUrl: image.image_url,
      alt: image.caption || title,
    })) || [];

  const exhibitionArtworks =
    exhibition?.exhibition_artworks
      ?.filter((item) => item.artworks)
      .map((item) => ({
        id: `artwork-${item.artworks.id}`,
        imageUrl:
          item.artworks.thumbnail_image_url ||
          item.artworks.optimized_image_url,
        fullImageUrl:
          item.artworks.optimized_image_url ||
          item.artworks.thumbnail_image_url,
        alt: item.artworks.title,
      })) || [];

  const galleryItems = [
    ...exhibitionImages,
    ...exhibitionArtworks,
  ].filter((item) => item.imageUrl);

  const closeCarousel = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryItems.length) %
          galleryItems.length
    );
  }, [galleryItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % galleryItems.length
    );
  }, [galleryItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") closeCarousel();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [
    selectedIndex,
    closeCarousel,
    showPrevious,
    showNext,
  ]);

  if (loading) {
    return (
      <p className="exhibition-page__status">{t.loading}</p>
    );
  }

  if (error) {
    return (
      <p className="exhibition-page__status" role="alert">
        {t.error}
      </p>
    );
  }

  if (!exhibition) {
    return (
      <p className="exhibition-page__status">
        {t.notFound}
      </p>
    );
  }

  const selectedItem =
    selectedIndex !== null
      ? galleryItems[selectedIndex]
      : null;

  return (
    <>
      <section className="exhibition-page">
        <Link
          to="/exhibiciones"
          className="exhibition-page__back"
        >
          <span aria-hidden="true">←</span> {t.back}
        </Link>

        <div className="exhibition-page__info">
          <h1 className="exhibition-page__title">
            {title}
          </h1>

          <div className="exhibition-page__details">
            {exhibition.year && (
              <p>{exhibition.year}</p>
            )}

            {exhibition.venue && (
              <p>{exhibition.venue}</p>
            )}

            {exhibition.curator && (
              <p>
                {t.curator}: {exhibition.curator}
              </p>
            )}
          </div>

          {description && (
            <p className="exhibition-page__description">
              {description}
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
                  rel="noopener noreferrer"
                >
                  {t.curatorialText} ↓
                </a>
              )}

              {exhibition.catalog_pdf_url && (
                <a
                  className="exhibition-page__download-link"
                  href={exhibition.catalog_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.catalog} ↓
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
                  aria-label={`${t.enlarge}: ${item.alt}`}
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
        <div
          className="exhibition-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            className="exhibition-page__close"
            type="button"
            onClick={closeCarousel}
            aria-label={t.close}
          >
            ×
          </button>

          {galleryItems.length > 1 && (
            <button
              className="exhibition-page__arrow exhibition-page__arrow--left"
              type="button"
              onClick={showPrevious}
              aria-label={t.previous}
            >
              ←
            </button>
          )}

          <div className="exhibition-page__lightbox-content">
            <img
              className="exhibition-page__lightbox-image"
              src={selectedItem.fullImageUrl}
              alt={selectedItem.alt}
            />

            <p className="exhibition-page__counter">
              {selectedIndex + 1} / {galleryItems.length}
            </p>
          </div>

          {galleryItems.length > 1 && (
            <button
              className="exhibition-page__arrow exhibition-page__arrow--right"
              type="button"
              onClick={showNext}
              aria-label={t.next}
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ExhibitionPage;
