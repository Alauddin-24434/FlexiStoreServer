import { Request, Response } from "express";
import { createProductIntoDb, findAllProductsInoDb, findProductById } from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await createProductIntoDb(body);

    // Send response
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: result,
    });
  } catch (error: any) {
    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during shop creation.",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for filtering, pagination, and sorting
    const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    

    // Fetch products using the service function
    const result = await findAllProductsInoDb(filter, page, limit, );

    // Send successful response
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      data: result.data,
      meta: result.meta,
    });
  } catch (error: any) {
    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving products.",
    });
  }
};




// Controller for finding a product by its ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    

    // Fetch the product by ID using the service function
    const product = await findProductById(Number(id));

    // If the product is found, return the product details
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error: any) {
    // Handle errors gracefully, like if the product is not found
    res.status(404).json({
      success: false,
      message: error.message || "Product not found.",
    });
  }
};