"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.access_secrect, {
        expiresIn: config_1.default.jwt.access_expireIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.refresh_secrect, {
        expiresIn: config_1.default.jwt.refresh_expireIn,
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
