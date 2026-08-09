import './Home.css';
import homeImage from '../assets/home.jpg';


function Home() {
  return (
    <section className="home">
      <div
       className="home__image"
       style={{ backgroundImage: `url(${homeImage})` }}
     />

      <div className="home__interface">
        <header className="home__header">
          <h1 className="home__name">Graciela Genovés</h1>

          <nav className="home__nav">
            <a href="/oleos">obras</a>
            <a href="/exhibiciones">exhibiciones</a>
            <a href="/bio">bio</a>
            <a href="#">c.v.</a>
            <a href="/contacto">contacto</a>
          </nav>
        </header>

        <footer className="home__footer">
          <div className="home__socials">
            <a href="#">instagram</a>
            <a href="#">facebook</a>
            <a href="#">whatsapp</a>
          </div>

          <div className="home__credits">
            <span>© 2026 Graciela Genovés</span>
            <span>
              desarrollado por <a href="#">pasaje_studio</a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Home;