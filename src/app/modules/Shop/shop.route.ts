import { Router } from "express";
import { createShop, findAllShops, findShopById, findShopsByVendorId, flowShops } from "./shop.controller";


const router= Router();

// register
router.post('/create-shop', createShop)
// get all shops
router.get('/shops', findAllShops)
// flow unflow
router.post('/shop/flow-action/:id', flowShops)
// get params
router.get('/shop/:id', findShopById )
// Add the route to fetch shops by vendorId
router.get('/shops/:vendorId', findShopsByVendorId); // Fetch shops by vendorId


export const shopRoutes= router; 