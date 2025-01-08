"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = void 0;
const express_1 = require("express");
const shop_controller_1 = require("./shop.controller");
const router = (0, express_1.Router)();
// register
router.post('/create-shop', shop_controller_1.createShop);
// get all shops
router.get('/shops', shop_controller_1.findAllShops);
// flow unflow
router.post('/shop/flow-action/:id', shop_controller_1.flowShops);
// get params
router.get('/shop/:id', shop_controller_1.findShopById);
// Add the route to fetch shops by vendorId
router.get('/shops/:vendorId', shop_controller_1.findShopsByVendorId); // Fetch shops by vendorId
exports.shopRoutes = router;
