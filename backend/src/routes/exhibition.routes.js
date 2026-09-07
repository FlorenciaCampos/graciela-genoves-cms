import express from "express";

import { getAllExhibitionsController } from "../controllers/exhibition.controller.js";

const router = express.Router();

router.get("/", getAllExhibitionsController);

export default router;