import "../styles/Contacto.css";
import contactImage from "../assets/contacto.jpg";

function Contacto() {
  return (
    <section className="contacto">
      <div className="contacto__background">
        <img
          src={contactImage}
          alt="Obra de Graciela Genovés"
          className="contacto__image"
        />

        <div className="contacto__form-container">
          <h1>Contacto</h1>

          <form className="contacto__form">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
            />

            <textarea
              name="message"
              placeholder="Mensaje"
              rows="5"
            />

            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacto;