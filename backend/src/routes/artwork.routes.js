// src/routes/artwork.routes.js

import { Router } from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  createArtwork,
  getAllArtworks,
  getArtworkById,
} from "../controllers/artwork.controller.js";

const router = Router();

router.post("/", upload.single("image"), createArtwork);

router.get("/", getAllArtworks);
router.get("/:id", getArtworkById);

export default router;