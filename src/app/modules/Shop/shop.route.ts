import { Router } from "express";
import { createShop } from "./shop.controller";


const router= Router();

// register
router.post('/create-shop', createShop)


export const shopRoutes= router; 