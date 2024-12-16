import { Request, Response } from "express";
import { createProductIntoDb } from "./product.service";

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

