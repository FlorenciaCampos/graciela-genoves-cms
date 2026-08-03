import express from "express";
import cors from "cors";

import artworkRoutes from "./routes/artwork.routes.js";
import authRoutes from "./auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend de Graciela Genovés funcionando.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/artworks", artworkRoutes);

export default app;