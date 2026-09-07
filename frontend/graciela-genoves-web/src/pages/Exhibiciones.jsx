import { useEffect, useState } from "react";

import { getExhibitions } from "../services/api";
import "../styles/Exposiciones.css";

function Exhibiciones() {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    async function loadExhibitions() {
      try {
        const data = await getExhibitions();
        setExhibitions(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadExhibitions();
  }, []);

  return (
    <section className="exposiciones">
      <h1 className="exposiciones__title">
        Exposiciones
      </h1>

      <div className="exposiciones__grid">
        {exhibitions.map((exhibition) => {
          const coverImage =
            exhibition.exhibition_images?.[0]?.image_url;

          return (
            <article
              className="exposiciones__item"
              key={exhibition.id}
            >
              {coverImage && (
                <div className="exposiciones__image-wrapper">
                  <img
                    className="exposiciones__image"
                    src={coverImage}
                    alt={exhibition.title}
                  />
                </div>
              )}

              <div className="exposiciones__info">
                <h2>{exhibition.title}</h2>

                {exhibition.year && (
                  <p>{exhibition.year}</p>
                )}

                {exhibition.venue && (
                  <p>{exhibition.venue}</p>
                )}

                {exhibition.curator && (
                  <p>
                    Curaduría: {exhibition.curator}
                  </p>
                )}

                {exhibition.short_description && (
                  <p className="exposiciones__description">
                    {exhibition.short_description}
                  </p>
                )}

                {exhibition.curatorial_pdf_url && (
                  <a
                    className="exposiciones__pdf"
                    href={exhibition.curatorial_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Descargar texto curatorial ↓
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Exhibiciones;