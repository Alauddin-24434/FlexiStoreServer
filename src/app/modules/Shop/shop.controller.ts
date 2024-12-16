import { Request, Response } from "express";
import { createShopIntoDb } from "./shop.service";

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

