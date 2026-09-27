import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

import homeImage from "../assets/home.jpg";
import firma from "../assets/firma.png";
import useLanguage from "../context/useLanguage";
import "./Home.css";

function Home() {
  const { language, changeLanguage } = useLanguage();

  const texts = {
    es: {
      works: "Obras",
      oils: "Óleos",
      watercolors: "Acuarelas",
      exhibitions: "Exposiciones",
      about: "Acerca de mí",
      contact: "Contacto",
      developedBy: "Desarrollado por",
      signatureAlt: "Firma de Graciela Genovés",
      languageLabel: "Seleccionar idioma",
    },
    en: {
      works: "Works",
      oils: "Oils",
      watercolors: "Watercolors",
      exhibitions: "Exhibitions",
      about: "About me",
      contact: "Contact",
      developedBy: "Developed by",
      signatureAlt: "Graciela Genovés signature",
      languageLabel: "Select language",
    },
  };

  const t = texts[language];

  return (
    <section className="home">
      <img className="home__image" src={homeImage} alt="" />

      <div className="home__interface">
        <header className="home__header">
          <img
            className="home__signature"
            src={firma}
            alt={t.signatureAlt}
          />

          <h1 className="home__artist-name">
            Graciela Genovés
          </h1>

          <nav className="home__nav">
            <div className="home__nav-group">
              <span className="home__nav-label">
                {t.works}
              </span>

              <div className="home__submenu">
                <Link to="/oleos">{t.oils}</Link>
                <Link to="/acuarelas">
                  {t.watercolors}
                </Link>
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
              className="home__language"
              aria-label={t.languageLabel}
            >
              <button
                type="button"
                className={
                  language === "es"
                    ? "home__language-button home__language-button--active"
                    : "home__language-button"
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
                    ? "home__language-button home__language-button--active"
                    : "home__language-button"
                }
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </div>
          </nav>
        </header>

        <footer className="home__footer">
          <div className="home__socials">
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

          <div className="home__credits">
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
    </section>
  );
}

export default Home;