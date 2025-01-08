import { Request, Response } from "express";
import {
  createShopIntoDb,
  findAllShopsIntoDB,
  findShopsByVendorIdIntoDB,
  flowShopIntoDB,
  getShopByIdIntoDb,
} from "./shop.service";

export const createShop = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await createShopIntoDb(body);

    // Send response
    res.status(201).json({
      success: true,
      message: "Shop created successfully.",
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

// Get a single shop by ID
export const findShopById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getShopByIdIntoDb(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Shop not found.",
    });
  }
};

export const flowShops = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // User ID from URL params
    const { shopId, action } = req.body; // shopId and action ('follow' or 'unfollow') from request body

    // Corrected the call to flowShopIntoDB, passing parameters in the correct format
    const result = await flowShopIntoDB({
      userId: id, // Convert the user ID to a number
      shopId: shopId, // Convert the shop ID to a number
      action, // action ('follow' or 'unfollow')
    });

    res.status(200).json({
      success: true,
      data: result, // Returning the result from the flowShopIntoDB function
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Shop not found.", // Error message if something goes wrong
    });
  }
};

// Get all shops with
export const findAllShops = async (req: Request, res: Response) => {
  try {
    const result = await findAllShopsIntoDB();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching shops.",
    });
  }
};
export const findShopsByVendorId = async (req: Request, res: Response) => {
  const vendorId= req.params.vendorId;
  try {
    const result = await findShopsByVendorIdIntoDB(vendorId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching shops.",
    });
  }
};
