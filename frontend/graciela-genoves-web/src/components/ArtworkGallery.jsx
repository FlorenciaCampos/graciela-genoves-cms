import { useCallback, useEffect, useState } from "react";
import "../styles/ArtworkGallery.css";

function ArtworkGallery({ artworks }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openCarousel = (index) => {
    setSelectedIndex(index);
  };

  const closeCarousel = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0 ? artworks.length - 1 : currentIndex - 1
    );
  }, [artworks.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === artworks.length - 1 ? 0 : currentIndex + 1
    );
  }, [artworks.length]);

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
  }, [selectedIndex, closeCarousel, showPrevious, showNext]);

  const selectedArtwork =
    selectedIndex !== null ? artworks[selectedIndex] : null;

  return (
    <>
      <section className="artwork-gallery">
        {artworks.map((artwork, index) => (
          <article className="artwork-gallery__artwork" key={artwork.id}>
            <button
              className="artwork-gallery__image-button"
              type="button"
              onClick={() => openCarousel(index)}
              aria-label={`Ver ${artwork.title}`}
            >
              <img
                className="artwork-gallery__image"
                src={
                  artwork.thumbnail_image_url || artwork.optimized_image_url
                }
                alt={artwork.title}
                loading="lazy"
                decoding="async"
              />
            </button>
          </article>
        ))}
      </section>

      {selectedArtwork && (
        <div className="artwork-gallery__lightbox">
          <button
            className="artwork-gallery__close"
            type="button"
            onClick={closeCarousel}
            aria-label="Cerrar"
          >
            ×
          </button>

          <button
            className="artwork-gallery__arrow artwork-gallery__arrow--left"
            type="button"
            onClick={showPrevious}
            aria-label="Obra anterior"
          >
            ←
          </button>

          <div className="artwork-gallery__lightbox-content">
            <img
              className="artwork-gallery__lightbox-image"
              src={selectedArtwork.optimized_image_url}
              alt={selectedArtwork.title}
            />

            <div className="artwork-gallery__lightbox-info">
              <p>{selectedArtwork.title}</p>

              {selectedArtwork.year && <p>{selectedArtwork.year}</p>}

              {selectedArtwork.technique && (
                <p>{selectedArtwork.technique}</p>
              )}

              {selectedArtwork.dimensions && (
                <p>{selectedArtwork.dimensions}</p>
              )}
            </div>
          </div>

          <button
            className="artwork-gallery__arrow artwork-gallery__arrow--right"
            type="button"
            onClick={showNext}
            aria-label="Obra siguiente"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}

export default ArtworkGallery;