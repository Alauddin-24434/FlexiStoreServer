"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Call the service function to handle registration
        const createUser = yield (0, auth_service_1.registerIntoDb)(body);
        // Extract the created user and tokens
        const { newUser, tokenGenerate } = createUser;
        const { accessToken, refreshToken } = tokenGenerate;
        // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
        });
        // Send response
        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                user: newUser,
                accessToken, // Include the access token in the response
            },
        });
    }
    catch (error) {
        // Handle errors gracefully
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during registration.",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Call the service function to handle login
        const userLogin = yield (0, auth_service_1.loginIntoDb)(body);
        // Extract user and tokens
        const { isFindUser, tokenGenerate } = userLogin;
        const { accessToken, refreshToken } = tokenGenerate;
        // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
        });
        // Send response with user data and access token
        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            data: {
                user: isFindUser,
                accessToken, // Include the access token in the response
            },
        });
    }
    catch (error) {
        // Handle errors gracefully
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during login.",
        });
    }
});
exports.login = login;
