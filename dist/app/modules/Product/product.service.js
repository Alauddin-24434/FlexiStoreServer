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
exports.findProductById = exports.findAllProductsInoDb = exports.createProductIntoDb = void 0;
const prismaClient_1 = require("../../utils/prismaClient");
const createProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Check if the shop with the given shopId exists
    const shopExists = yield prismaClient_1.prisma.shop.findUnique({
        where: {
            id: payload.shopId, // Check for the shop with this shopId
        },
    });
    if (!shopExists) {
        // If the shop doesn't exist, throw an error
        throw new Error("Shop not found. Please provide a valid shopId.");
    }
    // Check if the user associated with the shop has the 'VENDOR' role
    const vendorUser = yield prismaClient_1.prisma.user.findUnique({
        where: {
            id: shopExists.vendorId, // We get the vendorId from the shop to check the user role
        },
    });
    if (!vendorUser || vendorUser.role !== 'VENDOR') {
        // If the vendor doesn't exist or the role is not VENDOR, throw an error
        throw new Error("Only users with the 'VENDOR' role can create a product.");
    }
    // Create a new product if all checks pass
    const newProduct = yield prismaClient_1.prisma.product.create({
        data: {
            name: payload.name,
            category: payload.category,
            description: payload.description,
            price: payload.price,
            stock: payload.stock,
            thumbnailImage: payload.thumbnailImage,
            additionalImages: payload.additionalImages,
            discount: (_a = payload.discount) !== null && _a !== void 0 ? _a : 0.0, // Default discount to 0.0 if not provided
            shopId: payload.shopId, // Link the product to the shop
            flashSaleIsActive: (_b = payload.flashSaleIsActive) !== null && _b !== void 0 ? _b : false, // Whether the flash sale is active (defaults to false)
            flashSaleDiscount: (_c = payload.flashSaleDiscount) !== null && _c !== void 0 ? _c : 0, // Discount during flash sale (defaults to 0)
            flashSaleStartTime: payload.flashSaleStartTime ? new Date(payload.flashSaleStartTime) : null, // Start time of flash sale
            flashSaleEndTime: payload.flashSaleEndTime ? new Date(payload.flashSaleEndTime) : null, // End time of flash sale
        },
    });
    return newProduct;
});
exports.createProductIntoDb = createProductIntoDb;
const findAllProductsInoDb = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}, // Filter criteria (e.g., name, category)
page = 1, // Current page (default 1)
limit = 10) {
    console.log(filter);
    // Validate page and limit to avoid invalid queries
    const pageNumber = Math.max(1, page);
    const resultsPerPage = Math.max(1, limit);
    // Calculate the offset (skip) based on page number and limit
    const skip = (pageNumber - 1) * resultsPerPage;
    // Prisma query to fetch products
    const products = yield prismaClient_1.prisma.product.findMany({
        where: Object.assign({}, filter),
        skip, // Pagination offset
        take: resultsPerPage, // Limit the results
    });
    // Get the total count of products for pagination metadata
    const totalProducts = yield prismaClient_1.prisma.product.count({
        where: Object.assign({}, filter),
    });
    // Return paginated products and metadata
    return {
        data: products,
        meta: {
            total: totalProducts,
            page: pageNumber,
            limit: resultsPerPage,
            totalPages: Math.ceil(totalProducts / resultsPerPage),
        },
    };
});
exports.findAllProductsInoDb = findAllProductsInoDb;
// Find a product by ID
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    // Fetch the product with the given ID
    const product = yield prismaClient_1.prisma.product.findFirst({
        where: {
            id: id, // The unique ID of the product
        },
        include: {
            // Optionally include related data
            shop: true, // Include products if your shop has a relation with products
        },
    });
    // If the product doesn't exist, return null or throw an error based on your preference
    if (!product) {
        throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
});
exports.findProductById = findProductById;
