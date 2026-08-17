import express from "express";
import { getExhibitionBySlug } from "../controllers/exhibition.controller.js";

const router = express.Router();

router.get("/:slug", getExhibitionBySlug);

export default router;