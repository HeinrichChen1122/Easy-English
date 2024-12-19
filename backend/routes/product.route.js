import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct)
router.get("/", getProducts)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router;