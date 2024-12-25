import express from "express";
import { getWords } from "../controllers/word.controller.js";

const router = express.Router();

router.get("/", getWords)

export default router;