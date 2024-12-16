import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./app/modules/Auth/auth.route";
import { notFound } from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandeler";
import { shopRoutes } from "./app/modules/Shop/shop.route";
import { productRoutes } from "./app/modules/Product/product.route";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded payloads
app.use(cookieParser()); // To parse cookies

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce API is running!");
});

app.use('/api', authRoutes);
app.use('/api'  , shopRoutes);
app.use('/api'  , productRoutes);

// Example to read cookies
app.get("/test-cookie", (req, res) => {
  console.log("Cookies: ", req.cookies);
  res.send("Check your server logs for cookies.");
});

// Not Found Middleware
app.use(notFound);

// Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
