// src/routes/artwork.routes.js
import { authenticate } from "../auth/auth.middleware.js";

import { Router } from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  createArtwork,
  getAllArtworks,
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
router.get("/", getAllArtworks);
router.get("/:id", getArtworkById);

router.put(
  "/:id",
  upload.single("image"),
  updateArtwork
);

export default router;