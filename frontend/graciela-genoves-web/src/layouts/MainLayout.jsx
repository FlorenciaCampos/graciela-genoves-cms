import { Link, Outlet } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

import "../styles/MainLayout.css";
import firmaNegra from "../assets/firma-negra.png";
import useLanguage from "../context/useLanguage";

function MainLayout() {
  const { language, changeLanguage } = useLanguage();

  const texts = {
    es: {
      works: "obras",
      oils: "óleos",
      watercolors: "acuarelas",
      exhibitions: "exposiciones",
      about: "acerca de mí",
      contact: "contacto",
      developedBy: "Desarrollado por",
      signatureAlt: "Firma de Graciela Genovés",
    },
    en: {
      works: "works",
      oils: "oils",
      watercolors: "watercolors",
      exhibitions: "exhibitions",
      about: "about me",
      contact: "contact",
      developedBy: "Developed by",
      signatureAlt: "Graciela Genovés signature",
    },
  };

  const t = texts[language];

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <Link
          to="/"
          className="main-layout__signature-link"
          aria-label="Graciela Genovés"
        >
          <img
            className="main-layout__signature"
            src={firmaNegra}
            alt={t.signatureAlt}
          />
        </Link>

        <Link
          to="/"
          className="main-layout__artist-name"
        >
          Graciela Genovés
        </Link>

        <nav className="main-layout__nav">
          <div className="main-layout__nav-group">
            <span className="main-layout__nav-label">
              {t.works}
            </span>

            <div className="main-layout__submenu">
              <Link to="/oleos">{t.oils}</Link>
              <Link to="/acuarelas">{t.watercolors}</Link>
            </div>
          </div>

          <Link to="/exposiciones">
            {t.exhibitions}
          </Link>

          <Link to="/acerca-de-mi">
            {t.about}
          </Link>

          <Link to="/contacto">
            {t.contact}
          </Link>

          <div
            className="main-layout__language"
            aria-label="Seleccionar idioma"
          >
            <button
              type="button"
              className={
                language === "es"
                  ? "main-layout__language-button main-layout__language-button--active"
                  : "main-layout__language-button"
              }
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>

            <span>/</span>

            <button
              type="button"
              className={
                language === "en"
                  ? "main-layout__language-button main-layout__language-button--active"
                  : "main-layout__language-button"
              }
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      <main className="main-layout__content">
        <Outlet />
      </main>

      <footer className="main-layout__footer">
        <div className="main-layout__socials">
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

        <div className="main-layout__credits">
          <span>© 2026 Graciela Genovés</span>

          <span>
            {t.developedBy}{" "}
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
    </div>
  );
}

export default MainLayout;