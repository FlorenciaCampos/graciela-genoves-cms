import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import ArtworksPage from "../pages/ArtworksPage";
import Exhibiciones from "../pages/Exhibiciones";
import Bio from "../pages/Bio";
import Contacto from "../pages/Contacto";

import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/pages/AdminDashboard";
import ProtectedRoute from "../admin/components/ProtectedRoute";

export const appRouter = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/oleos",
        element: <ArtworksPage category="oleos" />,
      },
      {
        path: "/acuarelas",
        element: <ArtworksPage category="acuarelas" />,
      },
      {
        path: "/exposiciones",
        element: <Exhibiciones />,
      },
      {
        path: "/bio",
        element: <Bio />,
      },
      {
        path: "/contacto",
        element: <Contacto />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);