import { useEffect, useState } from "react";

import ArtworkGallery from "../components/ArtworkGallery";
import { getArtworks } from "../services/api";

import "../styles/ArtworksPage.css";

function ArtworksPage({ category }) {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    async function loadArtworks() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getArtworks(category);

        if (isActive) {
          setArtworks(data);
        }
      } catch (error) {
        console.error(error);

        if (isActive) {
          setError("No se pudieron cargar las obras.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadArtworks();

    return () => {
      isActive = false;
    };
  }, [category]);

  if (isLoading) {
    return (
      <div className="artworks-page">
        <main className="artworks-page__content">
          <p className="artworks-page__status">Cargando obras...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="artworks-page">
        <main className="artworks-page__content">
          <p className="artworks-page__status">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="artworks-page">
      <main className="artworks-page__content">
        <ArtworkGallery artworks={artworks} />
      </main>
    </div>
  );
}

export default ArtworksPage;