import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Oleos from '../pages/Oleos';
import Acuarelas from '../pages/Acuarelas';
import Exhibiciones from '../pages/Exhibiciones';
import Bio from '../pages/Bio';
import Contacto from '../pages/Contacto';

export const appRouter = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/oleos',
        element: <Oleos />,
      },
      {
        path: '/acuarelas',
        element: <Acuarelas />,
      },
      {
        path: '/exhibiciones',
        element: <Exhibiciones />,
      },
      {
        path: '/bio',
        element: <Bio />,
      },
      {
        path: '/contacto',
        element: <Contacto />,
      },
    ],
  },
]);