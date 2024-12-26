import express from "express";
import { getWords } from "../controllers/word.controller.js";

const router = express.Router();

router.get("/:videoKey", getWords)

export default router;