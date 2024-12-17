"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
// Create a new product
router.post("/create-product", product_controller_1.createProduct);
// Get all products with filtering, pagination, and sorting
router.get("/products", product_controller_1.getAllProducts);
router.get("/products/:id", product_controller_1.getProductById); // Get a product by ID
exports.productRoutes = router;
