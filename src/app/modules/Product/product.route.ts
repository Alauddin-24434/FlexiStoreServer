import { Router } from "express";
import { createProduct, getAllProducts, getProductById } from "./product.controller";

const router = Router();

// Create a new product
router.post("/create-product", createProduct);

// Get all products with filtering, pagination, and sorting
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);  // Get a product by ID
export const productRoutes = router;
