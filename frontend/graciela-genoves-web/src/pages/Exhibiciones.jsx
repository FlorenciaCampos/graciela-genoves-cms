
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getExhibitions } from "../services/api";
import useLanguage from "../context/useLanguage";
import "../styles/Exposiciones.css";

function Exhibiciones() {
  const [exhibitions, setExhibitions] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { language } = useLanguage();

  const texts = {
    es: {
      heading: "Exposiciones",
      sortBy: "Ordenar por:",
      recent: "Más recientes",
      oldest: "Más antiguas",
      curator: "Curaduría",
      curatorialText: "Descargar texto curatorial",
      catalog: "Descargar catálogo",
      view: "Ver exposición",
      loading: "Cargando exposiciones...",
      error: "No se pudieron cargar las exposiciones.",
      empty: "No hay exposiciones disponibles.",
    },
    en: {
      heading: "Exhibitions",
      sortBy: "Sort by:",
      recent: "Most recent",
      oldest: "Oldest",
      curator: "Curated by",
      curatorialText: "Download curatorial text",
      catalog: "Download catalog",
      view: "View exhibition",
      loading: "Loading exhibitions...",
      error: "Could not load exhibitions.",
      empty: "No exhibitions available.",
    },
  };

  const t = texts[language] || texts.es;

  useEffect(() => {
    let active = true;

    async function loadExhibitions() {
      try {
        setLoading(true);
        const data = await getExhibitions();

        if (active) {
          setExhibitions(data || []);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setError("error");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadExhibitions();

    return () => {
      active = false;
    };
  }, []);

  const sortedExhibitions = [...exhibitions].sort((a, b) => {
    const yearA = Number(a.year) || 0;
    const yearB = Number(b.year) || 0;

    return sortOrder === "recent"
      ? yearB - yearA
      : yearA - yearB;
  });

  return (
    <section className="exposiciones">
      <div className="exposiciones__header">
        <h1 className="exposiciones__title">
          {t.heading}
        </h1>

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
            <option value="recent">{t.recent}</option>
            <option value="oldest">{t.oldest}</option>
          </select>
        </div>
      </div>

      {loading && (
        <p className="exposiciones__message">
          {t.loading}
        </p>
      )}

      {!loading && error && (
        <p className="exposiciones__message" role="alert">
          {t.error}
        </p>
      )}

      {!loading && !error && (
        <div className="exposiciones__list">
          {sortedExhibitions.length === 0 && (
            <p className="exposiciones__message">
              {t.empty}
            </p>
          )}

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

            const detailUrl = exhibition.slug
              ? `/exhibiciones/${exhibition.slug}`
              : null;

            return (
              <article
                className="exposiciones__item"
                key={exhibition.id}
              >
                <div className="exposiciones__visual">
                  {coverImage &&
                    (detailUrl ? (
                      <Link
                        to={detailUrl}
                        className="exposiciones__image-link"
                        aria-label={`${t.view}: ${title}`}
                      >
                        <img
                          className="exposiciones__image"
                          src={coverImage}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    ) : (
                      <img
                        className="exposiciones__image"
                        src={coverImage}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                </div>

                <div className="exposiciones__info">
                  <h2 className="exposiciones__name">
                    {title}
                  </h2>

                  <div className="exposiciones__details">
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
                    <p className="exposiciones__description">
                      {description}
                    </p>
                  )}

                  <div className="exposiciones__links">
                    {detailUrl && (
                      <Link
                        to={detailUrl}
                        className="exposiciones__view"
                      >
                        {t.view} <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    {exhibition.curatorial_pdf_url && (
                      <a
                        className="exposiciones__pdf"
                        href={exhibition.curatorial_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.curatorialText} ↓
                      </a>
                    )}

                    {exhibition.catalog_pdf_url && (
                      <a
                        className="exposiciones__pdf"
                        href={exhibition.catalog_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.catalog} ↓
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Exhibiciones;
