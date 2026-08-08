import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Oleos from '../pages/Oleos';
import Acuarelas from '../pages/Acuarelas';
import Exhibiciones from '../pages/Exhibiciones';
import Bio from '../pages/Bio';
import Contacto from '../pages/Contacto';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
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
]);