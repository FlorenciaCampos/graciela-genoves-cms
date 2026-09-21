import { useEffect, useState } from "react";

import { getExhibitions } from "../services/api";
import "../styles/Exposiciones.css";

function Exhibiciones() {
  const [exhibitions, setExhibitions] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

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

  const sortedExhibitions = [...exhibitions].sort((a, b) => {
    const yearA = Number(a.year) || 0;
    const yearB = Number(b.year) || 0;

    if (sortOrder === "recent") {
      return yearB - yearA;
    }

    return yearA - yearB;
  });

  return (
    <section className="exposiciones">
      <div className="exposiciones__header">
        <h1 className="exposiciones__title">
          Exposiciones
        </h1>

        <div className="exposiciones__sort">
          <label htmlFor="sort-exhibitions">
            Ordenar por:
          </label>

          <select
            id="sort-exhibitions"
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value)
            }
          >
            <option value="recent">
              Más recientes
            </option>

            <option value="oldest">
              Más antiguas
            </option>
          </select>
        </div>
      </div>

      <div className="exposiciones__grid">
        {sortedExhibitions.map((exhibition) => {
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

                {exhibition.catalog_pdf_url && (
                  <a
                    className="exposiciones__pdf"
                    href={exhibition.catalog_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Descargar catálogo ↓
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