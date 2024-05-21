import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js"; // Pastikan path dan nama file benar

const router = express.Router();

// Definisikan rute
router.get("/me", Me);
router.post("/login", Login);
router.delete("/logOut", logOut);

export default router;
