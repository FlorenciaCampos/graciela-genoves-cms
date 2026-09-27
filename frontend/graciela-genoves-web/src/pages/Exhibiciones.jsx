import { useEffect, useState } from "react";

import { getExhibitions } from "../services/api";
import useLanguage from "../context/useLanguage";
import "../styles/Exposiciones.css";

function Exhibiciones() {
  const [exhibitions, setExhibitions] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  const { language } = useLanguage();

  const texts = {
    es: {
      sortBy: "Ordenar por:",
      recent: "Más recientes",
      oldest: "Más antiguas",
      curator: "Curaduría",
      curatorialText: "Descargar texto curatorial ↓",
      catalog: "Descargar catálogo ↓",
    },
    en: {
      sortBy: "Sort by:",
      recent: "Most recent",
      oldest: "Oldest",
      curator: "Curated by",
      curatorialText: "Download curatorial text ↓",
      catalog: "Download catalog ↓",
    },
  };

  const t = texts[language];

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
        <div className="exposiciones__sort">
          <label htmlFor="sort-exhibitions">
            {t.sortBy}
          </label>

          <select
            id="sort-exhibitions"
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value)
            }
          >
            <option value="recent">
              {t.recent}
            </option>

            <option value="oldest">
              {t.oldest}
            </option>
          </select>
        </div>
      </div>

      <div className="exposiciones__grid">
        {sortedExhibitions.map((exhibition) => {
          const coverImage =
            exhibition.exhibition_images?.[0]?.image_url;

          const title =
            language === "en"
              ? exhibition.title_en ||
                exhibition.title_es ||
                exhibition.title
              : exhibition.title_es ||
                exhibition.title;

          const description =
            language === "en"
              ? exhibition.short_description_en ||
                exhibition.short_description_es ||
                exhibition.short_description
              : exhibition.short_description_es ||
                exhibition.short_description;

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
                    alt={title}
                  />
                </div>
              )}

              <div className="exposiciones__info">
                <h2>{title}</h2>

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

                {description && (
                  <p className="exposiciones__description">
                    {description}
                  </p>
                )}

                {exhibition.curatorial_pdf_url && (
                  <a
                    className="exposiciones__pdf"
                    href={exhibition.curatorial_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.curatorialText}
                  </a>
                )}

                {exhibition.catalog_pdf_url && (
                  <a
                    className="exposiciones__pdf"
                    href={exhibition.catalog_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.catalog}
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