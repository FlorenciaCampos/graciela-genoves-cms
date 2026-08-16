import { Link, Outlet } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "../styles/MainLayout.css";
import firmaNegra from "../assets/firma-negra.png";

function MainLayout() {
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
            alt="Graciela Genovés"
          />
        </Link>

        <nav className="main-layout__nav">
          <div className="main-layout__nav-group">
            <span className="main-layout__nav-label">obras</span>

            <div className="main-layout__submenu">
              <Link to="/oleos">óleos</Link>
              <Link to="/acuarelas">acuarelas</Link>
            </div>
          </div>

          <div className="main-layout__nav-group">
            <span className="main-layout__nav-label">exhibiciones</span>

            <div className="main-layout__submenu">
              <a href="#">Tonal</a>
              <a href="#">Leitmotiv</a>
              <a href="#">Madrigal</a>
              <a href="#">Atlanta</a>
              <a href="#">Rapsodia</a>
              <a href="#">Febril la mirada</a>
            </div>
          </div>

          <Link to="/bio">bio</Link>
          <a href="#">c.v.</a>
          <Link to="/contacto">contacto</Link>
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
  );
}

export default MainLayout;