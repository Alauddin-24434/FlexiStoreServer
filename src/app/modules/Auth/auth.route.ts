import { Router } from "express";
import { login, register } from "./auth.controller";

const router= Router();

// register
router.post('/register', register)

// Optionally, add login, logout, and refresh token routes:
router.post('/login', login); // Add login functionality
export const authRoutes= router; 