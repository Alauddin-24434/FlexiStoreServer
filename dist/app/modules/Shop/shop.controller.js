"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShop = void 0;
const shop_service_1 = require("./shop.service");
const createShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield (0, shop_service_1.createShopIntoDb)(body);
        // Send response
        res.status(201).json({
            success: true,
            message: "Shop created successfully.",
            data: result,
        });
    }
    catch (error) {
        // Handle errors gracefully
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during shop creation.",
        });
    }
});
exports.createShop = createShop;
