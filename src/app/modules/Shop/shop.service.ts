import { prisma } from "../../utils/prismaClient";
import { Shop } from "./shop.interface";

export const createShopIntoDb = async (payload: Shop) => {
  // Check if the shop with the same name already exists
  const isExistShop = await prisma.shop.findUnique({
    where: {
      name: payload.name, // This works because name is unique
    },
  });

  if (isExistShop) {
    // If shop exists, return an appropriate response or error
    throw new Error("Shop Name already exists. Please use a different name.");
  }

  // Check if the user has the 'VENDOR' role
  const vendorUser = await prisma.user.findUnique({
    where: {
      id: payload.vendorId, // Assuming vendorId is passed in the payload
    },
  });

  if (!vendorUser || vendorUser.role !== 'VENDOR') {
    // If the user doesn't exist or the role is not VENDOR, throw an error
    throw new Error("Only users with the 'VENDOR' role can create a shop.");
  }

  // If shop does not exist and role is valid, create a new shop
  const newShop = await prisma.shop.create({
    data: {
      name: payload.name,
      logo: payload.logo, // Assuming logo can be nullable
      description: payload.description,
      vendorId: payload.vendorId, // Assuming vendorId is provided in payload
    },
  });

  return newShop;
};
