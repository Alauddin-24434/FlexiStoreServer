"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
// register
router.post('/register', auth_controller_1.register);
// Optionally, add login, logout, and refresh token routes:
router.post('/login', auth_controller_1.login); // Add login functionality
exports.authRoutes = router;
