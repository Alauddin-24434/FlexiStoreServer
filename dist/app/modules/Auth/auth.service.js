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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIntoDb = exports.registerIntoDb = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTokens_1 = require("../../utils/generateTokens");
const prismaClient_1 = require("../../utils/prismaClient");
const registerIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // chek if the imal already exist
    const existingUser = yield prismaClient_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new Error("Email already exists. Please use a different email.");
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 12);
    //   create newUser
    const newUser = yield prismaClient_1.prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
        },
    });
    // Create JWT payload
    const jwtPayload = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    };
    const tokenGenerate = (0, generateTokens_1.generateTokens)(jwtPayload);
    return { newUser, tokenGenerate };
});
exports.registerIntoDb = registerIntoDb;
const loginIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check the exist email
    const isFindUser = yield prismaClient_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!isFindUser) {
        throw new Error("user not found");
    }
    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = yield bcryptjs_1.default.compare(payload.password, isFindUser.password);
    if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
    }
    // Create JWT payload
    const jwtPayload = {
        id: isFindUser.id,
        name: isFindUser.name,
        email: isFindUser.email,
        role: isFindUser.role,
    };
    // Generate JWT token
    const tokenGenerate = (0, generateTokens_1.generateTokens)(jwtPayload);
    return { isFindUser, tokenGenerate };
});
exports.loginIntoDb = loginIntoDb;
