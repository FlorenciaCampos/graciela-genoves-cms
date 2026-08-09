import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <header>
        <p>graciela genovés</p>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Graciela Genovés</p>
        <p>desarrollado por pasaje_studio</p>
      </footer>
    </>
  );
}

export default MainLayout;