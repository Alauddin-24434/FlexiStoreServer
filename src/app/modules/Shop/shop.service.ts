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
      id:payload.vendorId, // Assuming vendorId is passed in the payload
    },
  });

  if (!vendorUser || vendorUser.role !== "VENDOR") {
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

export const findAllShopsIntoDB = async () => {
  // Fetch all shops from the database
  const shops = await prisma.shop.findMany({
    include: {
      vendor: true, // Include vendor details
      products: true, // Include associated products
    },
  });

  return shops;
};

export const findShopsByVendorIdIntoDB = async (vendorId: string) => {
  // Fetch shops where the vendorId matches, only return vendor and its details
  const shops = await prisma.shop.findMany({
    where: {
      vendorId: vendorId, // Filter by vendorId
    }
  });

  return shops;
};


export const getShopByIdIntoDb = async (id: string) => {
  // Fetch the shop using the provided shopId
  const shop = await prisma.shop.findUnique({
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
};



// Function to handle following/unfollowing a shop
export const flowShopIntoDB = async ({userId, shopId, action}:{userId:string, shopId:string, action:string}) => {
  // Check if the shop exists
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    throw new Error("shop not found");
  }

  if (action === 'follow') {
    // Add the shop to the user's followed shops
  const flow=  await prisma.user.update({
      where: { id: userId },
      data: {
        flowShops: {
          connect: { id: shopId },  // Adds the shop to the `flowShops` relation
        },
      },
    });

    return flow;
  }

  if (action === 'unfollow') {
    // Remove the shop from the user's followed shops
  const unflow=  await prisma.user.update({
      where: { id: userId },
      data: {
        flowShops: {
          disconnect: { id: shopId },  // Removes the shop from the `flowShops` relation
        },
      },
    });

    return unflow;
  }
};
