"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./app/modules/Auth/auth.route");
const notFound_1 = require("./app/middlewares/notFound");
const globalErrorHandeler_1 = require("./app/middlewares/globalErrorHandeler");
const shop_route_1 = require("./app/modules/Shop/shop.route");
const product_route_1 = require("./app/modules/Product/product.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: ["https://flexi-store-front-end.vercel.app", "http://localhost:3000"],
    credentials: true,
}));
app.use(express_1.default.json()); // For JSON payloads
app.use(express_1.default.urlencoded({ extended: true })); // For URL-encoded payloads
app.use((0, cookie_parser_1.default)()); // To parse cookies
// Test route
app.get("/", (req, res) => {
    res.send("E-Commerce API is running!");
});
app.use('/api', auth_route_1.authRoutes);
app.use('/api', shop_route_1.shopRoutes);
app.use('/api', product_route_1.productRoutes);
// Example to read cookies
app.get("/test-cookie", (req, res) => {
    console.log("Cookies: ", req.cookies);
    res.send("Check your server logs for cookies.");
});
// Not Found Middleware
app.use(notFound_1.notFound);
// Global Error Handler Middleware
app.use(globalErrorHandeler_1.globalErrorHandler);
exports.default = app;
