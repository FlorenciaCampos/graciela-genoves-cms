import { useEffect, useState } from "react";

import ArtworkGallery from "../components/ArtworkGallery";
import { getArtworks } from "../services/api";

import "../styles/ArtworksPage.css";

function Oleos() {
  const [artworks, setArtworks] = useState([]);

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

  return (
    <div className="artworks-page">
      <main className="artworks-page__content">
        <ArtworkGallery artworks={artworks} />
      </main>
    </div>
  );
}

export default Oleos;