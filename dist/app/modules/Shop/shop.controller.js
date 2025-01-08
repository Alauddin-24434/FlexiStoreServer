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
exports.findShopsByVendorId = exports.findAllShops = exports.flowShops = exports.findShopById = exports.createShop = void 0;
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
// Get a single shop by ID
const findShopById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, shop_service_1.getShopByIdIntoDb)(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Shop not found.",
        });
    }
});
exports.findShopById = findShopById;
const flowShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // User ID from URL params
        const { shopId, action } = req.body; // shopId and action ('follow' or 'unfollow') from request body
        // Corrected the call to flowShopIntoDB, passing parameters in the correct format
        const result = yield (0, shop_service_1.flowShopIntoDB)({
            userId: id, // Convert the user ID to a number
            shopId: shopId, // Convert the shop ID to a number
            action, // action ('follow' or 'unfollow')
        });
        res.status(200).json({
            success: true,
            data: result, // Returning the result from the flowShopIntoDB function
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Shop not found.", // Error message if something goes wrong
        });
    }
});
exports.flowShops = flowShops;
// Get all shops with
const findAllShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, shop_service_1.findAllShopsIntoDB)();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while fetching shops.",
        });
    }
});
exports.findAllShops = findAllShops;
const findShopsByVendorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.vendorId;
    try {
        const result = yield (0, shop_service_1.findShopsByVendorIdIntoDB)(vendorId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while fetching shops.",
        });
    }
});
exports.findShopsByVendorId = findShopsByVendorId;
