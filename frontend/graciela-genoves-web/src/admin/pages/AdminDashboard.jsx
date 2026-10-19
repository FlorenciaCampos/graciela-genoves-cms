
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__container">

        {/* VOLVER AL SITIO */}

        <Link
          to="/"
          className="admin-dashboard__back"
        >
          ← Volver al sitio
        </Link>

        {/* ENCABEZADO */}

        <header className="admin-dashboard__header">
          <p className="admin-dashboard__eyebrow">
            GRACIELA GENOVÉS · ADMIN
          </p>

          <h1>Panel de administración</h1>

          <p className="admin-dashboard__description">
            Desde aquí podés administrar el contenido de tu sitio web.
          </p>
        </header>

        {/* OPCIONES DEL PANEL */}

        <section
          className="admin-dashboard__grid"
          aria-label="Secciones de administración"
        >

          {/* OBRAS */}

          <article className="admin-dashboard__card">
            <h2>Obras</h2>

            <p>
              Agregá, editá u ocultá tus obras de óleo
              y acuarela.
            </p>

            <Link
              to="/admin/obras"
              className="admin-dashboard__button"
            >
              Gestionar obras
              <span aria-hidden="true">→</span>
            </Link>
          </article>

          {/* EXPOSICIONES */}

          <article className="admin-dashboard__card">
            <h2>Exposiciones</h2>

            <p>
              Administrá tus exposiciones,
              fotografías y textos curatoriales.
            </p>

            <span className="admin-dashboard__pending">
              Próximamente
            </span>
          </article>

          {/* SOBRE MÍ */}

          <article className="admin-dashboard__card">
            <h2>Sobre mí</h2>

            <p>
              Editá tu biografía, currículum,
              statement y escritos.
            </p>

            <span className="admin-dashboard__pending">
              Próximamente
            </span>
          </article>

          {/* CONTACTO */}

          <article className="admin-dashboard__card">
            <h2>Contacto</h2>

            <p>
              Administrá la información de contacto
              de tu sitio web.
            </p>

            <span className="admin-dashboard__pending">
              Próximamente
            </span>
          </article>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
