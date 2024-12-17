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
      category: payload.category,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      imageUrl: payload.imageUrl, // Assuming imageUrl is optional
      discount: payload.discount ?? 0.0, // Default discount to 0.0 if not provided
      shopId: payload.shopId, // Link the product to the shop
      flashSaleIsActive: payload.flashSaleIsActive ?? false, // Whether the flash sale is active (defaults to false)
      flashSaleDiscount: payload.flashSaleDiscount ?? 0, // Discount during flash sale (defaults to 0)
      flashSaleStartTime: payload.flashSaleStartTime ? new Date(payload.flashSaleStartTime) : null, // Start time of flash sale
      flashSaleEndTime: payload.flashSaleEndTime ? new Date(payload.flashSaleEndTime) : null, // End time of flash sale
    },
  });
  
  return newProduct;
};




export const findAllProductsInoDb = async (
  filter: any = {}, // Filter criteria (e.g., name, category)
  page: number = 1, // Current page (default 1)
  limit: number = 10, // Results per page (default 10)

 
) => {
  console.log(filter)
  // Validate page and limit to avoid invalid queries
  const pageNumber = Math.max(1, page);
  const resultsPerPage = Math.max(1, limit);

  // Calculate the offset (skip) based on page number and limit
  const skip = (pageNumber - 1) * resultsPerPage;

  // Prisma query to fetch products
  const products = await prisma.product.findMany({
    where: {
      // Dynamic filtering logic
      ...filter,
    },
    skip, // Pagination offset
    take: resultsPerPage, // Limit the results

  });

  // Get the total count of products for pagination metadata
  const totalProducts = await prisma.product.count({
    where: {
      ...filter,
    },
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
};


// Find a product by ID
export const findProductById = async (id:number) => {
  console.log(id)
  // Fetch the product with the given ID
  const product = await prisma.product.findFirst({
    where: {
      id: id, // The unique ID of the product
    },
  });

  // If the product doesn't exist, return null or throw an error based on your preference
  if (!product) {
    throw new Error(`Product with ID ${id} not found.`);
  }

  return product;
};