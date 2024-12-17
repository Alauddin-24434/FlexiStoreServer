"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = void 0;
const express_1 = require("express");
const shop_controller_1 = require("./shop.controller");
const router = (0, express_1.Router)();
// register
router.post('/create-shop', shop_controller_1.createShop);
exports.shopRoutes = router;
