
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/api";
import loginImage from "../../assets/login.jpg";

import "../styles/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);

      localStorage.setItem(
        "admin_token",
        data.access_token
      );

      navigate("/admin", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="admin-login"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="admin-login__overlay" />

      <section className="admin-login__card">
        <p className="admin-login__eyebrow">
          GRACIELA GENOVÉS
        </p>

        <h1>Administración</h1>

        <p className="admin-login__description">
          Ingresá para administrar tu sitio web.
        </p>

        <form
          className="admin-login__form"
          onSubmit={handleSubmit}
        >
          <div className="admin-login__field">
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Ingresá tu correo"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Ingresá tu contraseña"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p
              className="admin-login__error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            className="admin-login__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <Link
          to="/"
          className="admin-login__back"
        >
          ← Volver al sitio
        </Link>
      </section>
    </main>
  );
}

export default AdminLogin;
