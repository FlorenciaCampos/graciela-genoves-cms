// src/routes/artwork.routes.js

import { Router } from "express";

import { authenticate } from "../auth/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  createArtwork,
  getAllArtworks,
  getAllArtworksAdmin,
  getArtworkById,
  updateArtwork,
} from "../controllers/artwork.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  createArtwork
);

// ADMIN: obtiene todas las obras, incluidas las ocultas
router.get(
  "/admin",
  authenticate,
  getAllArtworksAdmin
);

// PÚBLICO: obtiene solamente las obras visibles
router.get("/", getAllArtworks);

router.get("/:id", getArtworkById);

router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  updateArtwork
);

export default router;