import { Router } from "express";
import { createProduct } from "./product.controller";



const router= Router();

// register
router.post('/create-product', createProduct)


export const productRoutes= router; 