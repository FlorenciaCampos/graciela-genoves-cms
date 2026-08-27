import express from "express";
import { getExhibitionBySlugController } from "../controllers/exhibition.controller.js";

const router = express.Router();

router.get("/:slug", getExhibitionBySlugController);

export default router;