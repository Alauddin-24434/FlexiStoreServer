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
exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield (0, product_service_1.createProductIntoDb)(body);
        // Send response
        res.status(201).json({
            success: true,
            message: "Product created successfully.",
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
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract query parameters for filtering, pagination, and sorting
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        // Fetch products using the service function
        const result = yield (0, product_service_1.findAllProductsInoDb)(filter, page, limit);
        // Send successful response
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully.",
            data: result.data,
            meta: result.meta,
        });
    }
    catch (error) {
        // Handle errors gracefully
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while retrieving products.",
        });
    }
});
exports.getAllProducts = getAllProducts;
// Controller for finding a product by its ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Fetch the product by ID using the service function
        const product = yield (0, product_service_1.findProductById)(Number(id));
        // If the product is found, return the product details
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully.",
            data: product,
        });
    }
    catch (error) {
        // Handle errors gracefully, like if the product is not found
        res.status(404).json({
            success: false,
            message: error.message || "Product not found.",
        });
    }
});
exports.getProductById = getProductById;
