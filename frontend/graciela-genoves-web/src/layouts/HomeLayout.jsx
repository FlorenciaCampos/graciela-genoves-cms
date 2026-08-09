import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div className="home-layout">
      <Outlet />
    </div>
  );
}

export default HomeLayout;