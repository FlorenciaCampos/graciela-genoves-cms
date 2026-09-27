import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { appRouter } from "./router/appRouter";
import LanguageProvider from "./context/LanguageProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={appRouter} />
    </LanguageProvider>
  </StrictMode>
);