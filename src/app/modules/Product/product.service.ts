import { prisma } from "../../utils/prismaClient";
import { Product } from "./product.interface"; // Assuming you have a Product interface

export const createProductIntoDb = async (payload: Product) => {
  // Check if the shop with the given shopId exists
  const shopExists = await prisma.shop.findUnique({
    where: {
      id: payload.shopId, // Check for the shop with this shopId
    },
  });

  if (!shopExists) {
    // If the shop doesn't exist, throw an error
    throw new Error("Shop not found. Please provide a valid shopId.");
  }

  // Check if the user associated with the shop has the 'VENDOR' role
  const vendorUser = await prisma.user.findUnique({
    where: {
      id: shopExists.vendorId, // We get the vendorId from the shop to check the user role
    },
  });

  if (!vendorUser || vendorUser.role !== 'VENDOR') {
    // If the vendor doesn't exist or the role is not VENDOR, throw an error
    throw new Error("Only users with the 'VENDOR' role can create a product.");
  }

 

  // Create a new product if all checks pass
  const newProduct = await prisma.product.create({
    data: {
      name: payload.name,
      category:payload.category,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      imageUrl: payload.imageUrl, // Assuming imageUrl is optional
      discount: payload.discount ?? 0.0, // Default discount to 0.0 if not provided
      shopId: payload.shopId, // Link the product to the shop
    },
  });

  return newProduct;
};
