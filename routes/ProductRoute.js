import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js"; // Pastikan path dan nama file benar

//saya hanya ingin product ini diakses oleh user yang udah login
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Definisikan rute
router.get("/products", verifyUser, getProducts);
router.get("/products/:id", verifyUser, getProductById);
router.post("/products", verifyUser, createProduct);
router.patch("/products/:id", verifyUser, updateProduct);
router.delete("/products/:id", verifyUser, deleteProduct);

export default router;
