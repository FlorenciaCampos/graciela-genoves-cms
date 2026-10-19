
import "../styles/Bio.css";
import useLanguage from "../context/useLanguage";
import sobreMi from "../assets/sobreMi.jpg";

const biography = {
  es: [
    "Graciela Genovés (La Plata, Buenos Aires, Argentina, 1962) es pintora y docente de pintura. Vive en Buenos Aires. Su trabajo se centra en dar color y forma a percepciones-sensaciones provenientes del mundo que la rodea.",

    "Estudió en la Facultad de Artes de la Universidad Nacional de La Plata, egresando como Profesora y Licenciada en Artes —orientación Pintura—, así como en el taller particular del maestro Osvaldo Attila.",

    "Trabaja principalmente con óleo y acuarela. Sus temas son escenas urbanas, interiores, paisajes y figuras que forman parte de su entorno, de su barrio, de su casa, de gente cercana. Su método de trabajo se basa en la memoria, que le aporta imágenes que se desarrollan a medida que las pinta.",

    "Su color es intenso, saturado, expresivo; su espacio es postcubista y su forma es relativamente plana.",

    "El aspecto abstracto de la pintura es muy importante en su trabajo, sin llegar a perder totalmente la figuración.",

    "Realizó numerosas muestras individuales en su país, como en el Museo Emilio Pettoruti, La Plata, Buenos Aires (2028); en Galería Zurbarán, Buenos Aires (2000, 2001, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2021 y 2023); y en Cassa Lepage, Buenos Aires (2024). En el exterior expuso en Besharat Gallery, Atlanta, EEUU (2008 y 2012).",

    "También participó en muestras colectivas, como en el Centro Cultural Recoleta (1999, 2000), Museo Carnacini (2018), entre otras.",

    "Entre sus principales premios se encuentran la Mención del Jurado del Salón Manuel Belgrano (2016), la Mención del Salón Banco Ciudad (2017) y el Primer Premio del Salón Bicentenario Concordia (2021).",
  ],

  en: [
    "Graciela Genovés (La Plata, Buenos Aires, Argentina, 1962) is a painter and painting teacher. She lives in Buenos Aires. Her work focuses on giving color and form to perceptions and sensations arising from the world around her.",

    "She studied at the Faculty of Arts of the National University of La Plata, graduating with degrees in Fine Arts and Art Education, specializing in painting. She also studied in the private studio of master painter Osvaldo Attila.",

    "She works primarily in oil and watercolor. Her subjects include urban scenes, interiors, landscapes, and figures drawn from her surroundings, neighborhood, home, and people close to her. Her working method is based on memory, which provides images that develop as she paints.",

    "Her colors are intense, saturated, and expressive; her pictorial space is post-Cubist and her forms are relatively flat.",

    "The abstract aspect of painting is very important in her work, without completely abandoning figuration.",

    "She has held numerous solo exhibitions in Argentina, including at the Emilio Pettoruti Museum in La Plata, Buenos Aires (2028); Galería Zurbarán, Buenos Aires (2000, 2001, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2021, and 2023); and Cassa Lepage, Buenos Aires (2024). Internationally, she exhibited at Besharat Gallery, Atlanta, USA (2008 and 2012).",

    "She has also participated in group exhibitions, including at Centro Cultural Recoleta (1999, 2000) and Museo Carnacini (2018), among others.",

    "Her major awards include the Jury's Honorable Mention at the Manuel Belgrano Salon (2016), a Mention at the Banco Ciudad Salon (2017), and First Prize at the Bicentenario Concordia Salon (2021).",
  ],
};

function Bio() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const paragraphs = biography[isEnglish ? "en" : "es"];

  const introduction = paragraphs.slice(0, 5);
  const trajectory = paragraphs.slice(5);

  return (
    <section className="bio">
      <div className="bio__content">

        {/* ENCABEZADO */}

        <h1 className="bio__title">
          {isEnglish ? "About me" : "Sobre mí"}
        </h1>

        {/* DOCUMENTOS Y BLOG */}

        <nav
          className="bio__documents"
          aria-label={
            isEnglish
              ? "Artist documents"
              : "Documentos de la artista"
          }
        >
          <a
            href="/cv-graciela-genoves.pdf"
            download
            className="bio__document"
          >
            CV
            <span
              className="bio__document-icon"
              aria-hidden="true"
            >
              ↓
            </span>
          </a>

          <a
            href="/Statement-graciela-genoves.pdf"
            download
            className="bio__document"
          >
            Statement
            <span
              className="bio__document-icon"
              aria-hidden="true"
            >
              ↓
            </span>
          </a>

          <a
            href="/El%20color%20y%20yo-graciela-genoves.pdf"
            download
            className="bio__document"
          >
            {isEnglish ? "Writings" : "Escritos"}
            <span
              className="bio__document-icon"
              aria-hidden="true"
            >
              ↓
            </span>
          </a>

          <a
            href="https://purapinturapura.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bio__document"
          >
            Blog
          </a>
        </nav>

        {/* LÍNEA DIVISORIA */}

        <div className="bio__line" />

        {/* PRIMERA PARTE: FOTO Y PRESENTACIÓN */}

        <div className="bio__body">

          <div className="bio__image-container">
            <img
              src={sobreMi}
              alt={
                isEnglish
                  ? "Portrait of Graciela Genovés"
                  : "Retrato de Graciela Genovés"
              }
              className="bio__image"
            />
          </div>

          <div className="bio__text bio__introduction">
            <h2 className="bio__subtitle">
              Graciela Genovés
            </h2>

            {introduction.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

        </div>

        {/* SEGUNDA PARTE: TRAYECTORIA */}

        <div className="bio__trajectory">
          <h2 className="bio__trajectory-title">
            {isEnglish ? "Trajectory" : "Trayectoria"}
          </h2>

          <div className="bio__text bio__trajectory-text">
            {trajectory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Bio;
