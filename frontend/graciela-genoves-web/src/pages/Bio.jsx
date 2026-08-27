import "../styles/Bio.css";
import bioImage from "../assets/bio.jpg";

function Bio() {
  return (
    <section className="bio">
      <div className="bio__hero">
        <img
          src={bioImage}
          alt="Graciela Genovés"
          className="bio__hero-image"
        />
      </div>

      <div className="bio__content">
        <div className="bio__cv-row">
          <a
            href="/cv-graciela-genoves.pdf"
            download
            className="bio__cv-link"
          >
            Descargar CV
          </a>
        </div>

        <div className="bio__line" />

        <div className="bio__text">
          <p>
            Graciela Genovés (La Plata, Buenos Aires, Argentina, 1962) es
            pintora y docente de pintura. Vive en Buenos Aires. Su trabajo se
            centra en dar color y forma a percepciones-sensaciones provenientes
            del mundo que la rodea.
          </p>

          <p>
            Estudió en la Facultad de Artes de la Universidad Nacional de La
            Plata, egresando como Profesora y Licenciada en Artes —orientación
            Pintura—, así como en el taller particular del maestro Osvaldo
            Attila.
          </p>

          <p>
            Trabaja principalmente con óleo y acuarela. Sus temas son escenas
            urbanas, interiores, paisajes y figuras que forman parte de su
            entorno, de su barrio, de su casa, de gente cercana. Su método de
            trabajo se basa en la memoria, que le aporta imágenes que se
            desarrollan a medida que las pinta.
          </p>

          <p>
            Su color es intenso, saturado, expresivo; su espacio es postcubista
            y su forma es relativamente plana.
          </p>

          <p>
            El aspecto abstracto de la pintura es muy importante en su trabajo,
            sin llegar a perder totalmente la figuración.
          </p>

          <p>
            Realizó numerosas muestras individuales en su país, como en el
            Museo Emilio Pettoruti, La Plata, Buenos Aires (2028); en Galería
            Zurbarán, Buenos Aires (2000, 2001, 2004, 2006, 2008, 2010, 2012,
            2014, 2016, 2018, 2021 y 2023); y en Cassa Lepage, Buenos Aires
            (2024). En el exterior expuso en Besharat Gallery, Atlanta, EEUU
            (2008 y 2012).
          </p>

          <p>
            También participó en muestras colectivas, como en el Centro
            Cultural Recoleta (1999, 2000), Museo Carnacini (2018), entre
            otras.
          </p>

          <p>
            Entre sus principales premios se encuentran la Mención del Jurado
            del Salón Manuel Belgrano (2016), la Mención del Salón Banco Ciudad
            (2017) y el Primer Premio del Salón Bicentenario Concordia (2021).
          </p>
        </div>
      </div>
    </section>
  );
}

export default Bio;