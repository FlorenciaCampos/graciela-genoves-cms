import "../styles/Contacto.css";
import contactImage from "../assets/contacto.jpg";
import useLanguage from "../context/useLanguage";

function Contacto() {
  const { language } = useLanguage();

  const texts = {
    es: {
      title: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar",
      imageAlt: "Obra de Graciela Genovés",
    },
    en: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      imageAlt: "Artwork by Graciela Genovés",
    },
  };

  const t = texts[language];

  return (
    <section className="contacto">
      <div className="contacto__background">
        <img
          src={contactImage}
          alt={t.imageAlt}
          className="contacto__image"
        />

        <div className="contacto__form-container">
          <h1>{t.title}</h1>

          <form className="contacto__form">
            <input
              type="text"
              name="name"
              placeholder={t.name}
            />

            <input
              type="email"
              name="email"
              placeholder={t.email}
            />

            <textarea
              name="message"
              placeholder={t.message}
              rows="5"
            />

            <button type="submit">
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacto;