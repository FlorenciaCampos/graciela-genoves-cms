import { useEffect, useState } from "react";
import { getArtworks } from "../services/api";

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
    <main>
      <h1>Óleos</h1>

      {artworks.map((artwork) => (
        <article key={artwork.id}>
          <img
            src={artwork.optimized_image_url}
            alt={artwork.title}
            width="400"
          />

          <h2>{artwork.title}</h2>
          <p>{artwork.year}</p>
          <p>{artwork.technique}</p>
        </article>
      ))}
    </main>
  );
}

export default Oleos;