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
exports.flowShopIntoDB = exports.getShopByIdIntoDb = exports.findShopsByVendorIdIntoDB = exports.findAllShopsIntoDB = exports.createShopIntoDb = void 0;
const prismaClient_1 = require("../../utils/prismaClient");
const createShopIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the shop with the same name already exists
    const isExistShop = yield prismaClient_1.prisma.shop.findUnique({
        where: {
            name: payload.name, // This works because name is unique
        },
    });
    if (isExistShop) {
        // If shop exists, return an appropriate response or error
        throw new Error("Shop Name already exists. Please use a different name.");
    }
    // Check if the user has the 'VENDOR' role
    const vendorUser = yield prismaClient_1.prisma.user.findUnique({
        where: {
            id: payload.vendorId, // Assuming vendorId is passed in the payload
        },
    });
    if (!vendorUser || vendorUser.role !== "VENDOR") {
        // If the user doesn't exist or the role is not VENDOR, throw an error
        throw new Error("Only users with the 'VENDOR' role can create a shop.");
    }
    // If shop does not exist and role is valid, create a new shop
    const newShop = yield prismaClient_1.prisma.shop.create({
        data: {
            name: payload.name,
            logo: payload.logo, // Assuming logo can be nullable
            description: payload.description,
            vendorId: payload.vendorId, // Assuming vendorId is provided in payload
        },
    });
    return newShop;
});
exports.createShopIntoDb = createShopIntoDb;
const findAllShopsIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all shops from the database
    const shops = yield prismaClient_1.prisma.shop.findMany({
        include: {
            vendor: true, // Include vendor details
            products: true, // Include associated products
        },
    });
    return shops;
});
exports.findAllShopsIntoDB = findAllShopsIntoDB;
const findShopsByVendorIdIntoDB = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch shops where the vendorId matches, only return vendor and its details
    const shops = yield prismaClient_1.prisma.shop.findMany({
        where: {
            vendorId: vendorId, // Filter by vendorId
        }
    });
    return shops;
});
exports.findShopsByVendorIdIntoDB = findShopsByVendorIdIntoDB;
const getShopByIdIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the shop using the provided shopId
    const shop = yield prismaClient_1.prisma.shop.findUnique({
        where: {
            id: id, // Assuming `id` is the unique identifier for shops
        },
        include: {
            // Optionally include related data
            products: true, // Include products if your shop has a relation with products
            vendor: true, // Include vendor information if needed
            followers: true,
        },
    });
    if (!shop) {
        // If no shop is found, throw an error
        throw new Error(`Shop with ID ${id} does not exist.`);
    }
    return shop;
});
exports.getShopByIdIntoDb = getShopByIdIntoDb;
// Function to handle following/unfollowing a shop
const flowShopIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, shopId, action }) {
    // Check if the shop exists
    const shop = yield prismaClient_1.prisma.shop.findUnique({
        where: { id: shopId },
    });
    if (!shop) {
        throw new Error("shop not found");
    }
    if (action === 'follow') {
        // Add the shop to the user's followed shops
        const flow = yield prismaClient_1.prisma.user.update({
            where: { id: userId },
            data: {
                flowShops: {
                    connect: { id: shopId }, // Adds the shop to the `flowShops` relation
                },
            },
        });
        return flow;
    }
    if (action === 'unfollow') {
        // Remove the shop from the user's followed shops
        const unflow = yield prismaClient_1.prisma.user.update({
            where: { id: userId },
            data: {
                flowShops: {
                    disconnect: { id: shopId }, // Removes the shop from the `flowShops` relation
                },
            },
        });
        return unflow;
    }
});
exports.flowShopIntoDB = flowShopIntoDB;
