import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

import homeImage from "../assets/home.jpg";
import firma from "../assets/firma.png";
import "./Home.css";

function Home() {
  return (
    <section className="home">
      <img className="home__image" src={homeImage} alt="" />

      <div className="home__interface">
        <header className="home__header">
          <img className="home__signature" src={firma} alt="Graciela Genovés" />

          <nav className="home__nav">
            <div className="home__nav-group">
              <span className="home__nav-label">Obras</span>

              <div className="home__submenu">
                <Link to="/oleos">Óleos</Link>
                <Link to="/acuarelas">Acuarelas</Link>
              </div>
            </div>

            <div className="home__nav-group">
              <span className="home__nav-label">Exhibiciones</span>

              <div className="home__submenu">
                <Link to="/exhibiciones/tonal">Tonal</Link>
                <Link to="/exhibiciones/leitmotiv">Leitmotiv</Link>
                <Link to="/exhibiciones/madrigal">Madrigal</Link>
                <Link to="/exhibiciones/atlanta">Atlanta</Link>
                <Link to="/exhibiciones/rapsodia">Rapsodia</Link>
                <Link to="/exhibiciones/febril-la-mirada">
                  Febril la mirada
                </Link>
              </div>
            </div>

            <Link to="/bio">bio</Link>
            <a href="#">c.v.</a>
            <Link to="/contacto">Contacto</Link>
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
      </div>
    </section>
  );
}

export default Home;
