import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

import { getArtworks } from "../services/api";
import "../styles/Oleos.css";

function Oleos() {
  const [artworks, setArtworks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function loadArtworks() {
      try {
        const data = await getArtworks();
        setArtworks(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadArtworks();
  }, []);

  const openCarousel = (index) => {
    setSelectedIndex(index);
  };

  const closeCarousel = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0 ? artworks.length - 1 : currentIndex - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === artworks.length - 1 ? 0 : currentIndex + 1
    );
  };

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
  }, [selectedIndex, artworks.length]);

  const selectedArtwork =
    selectedIndex !== null ? artworks[selectedIndex] : null;

  return (
    <div className="oleos">
      <header className="oleos__header">
        <Link to="/" className="oleos__name">
          Graciela Genovés
        </Link>

        <nav className="oleos__nav">
          <div className="oleos__nav-group">
            <span className="oleos__nav-label">obras</span>

            <div className="oleos__submenu">
              <Link to="/oleos">óleos</Link>
              <Link to="/acuarelas">acuarelas</Link>
            </div>
          </div>

          <div className="oleos__nav-group">
            <span className="oleos__nav-label">exhibiciones</span>

            <div className="oleos__submenu">
              <a href="#">Tonal</a>
              <a href="#">Leitmotiv</a>
              <a href="#">Madrigal</a>
              <a href="#">Atlanta</a>
              <a href="#">Rapsodia</a>
              <a href="#">Febril la mirada</a>
            </div>
          </div>

          <Link to="/bio">bio</Link>
          <a href="#">c.v.</a>
          <Link to="/contacto">contacto</Link>
        </nav>
      </header>

      <main className="oleos__content">
        <section className="oleos__list">
          {artworks.map((artwork, index) => (
            <article className="oleos__artwork" key={artwork.id}>
              <button
                className="oleos__image-button"
                type="button"
                onClick={() => openCarousel(index)}
              >
                <img
                  className="oleos__image"
                  src={artwork.optimized_image_url}
                  alt={artwork.title}
                />
              </button>

              <div className="oleos__info">
                <button
                  className="oleos__title-button"
                  type="button"
                  onClick={() => openCarousel(index)}
                >
                  {artwork.title}
                </button>

                <p>{artwork.year}</p>
                <p>{artwork.technique}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="oleos__footer">
        <div className="oleos__socials">
          <a
            href="https://www.instagram.com/gracielagenoves/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/gragenoves"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://wa.me/5491133672622"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>

        <div className="oleos__credits">
          <span>© 2026 Graciela Genovés</span>

          <span>
            Desarrollado por{" "}
            <a
              href="https://www.instagram.com/pasaje_studio/"
              target="_blank"
              rel="noreferrer"
            >
              pasaje_studio
            </a>
          </span>
        </div>
      </footer>

      {selectedArtwork && (
        <div className="oleos__lightbox">
          <button
            className="oleos__close"
            type="button"
            onClick={closeCarousel}
            aria-label="Cerrar"
          >
            ×
          </button>

          <button
            className="oleos__arrow oleos__arrow--left"
            type="button"
            onClick={showPrevious}
            aria-label="Obra anterior"
          >
            ←
          </button>

          <div className="oleos__lightbox-content">
            <img
              className="oleos__lightbox-image"
              src={selectedArtwork.optimized_image_url}
              alt={selectedArtwork.title}
            />

            <div className="oleos__lightbox-info">
              <p>{selectedArtwork.title}</p>
              <p>{selectedArtwork.year}</p>
              <p>{selectedArtwork.technique}</p>
            </div>
          </div>

          <button
            className="oleos__arrow oleos__arrow--right"
            type="button"
            onClick={showNext}
            aria-label="Obra siguiente"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default Oleos;