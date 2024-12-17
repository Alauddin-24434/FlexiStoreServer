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
exports.createShopIntoDb = void 0;
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
    if (!vendorUser || vendorUser.role !== 'VENDOR') {
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
