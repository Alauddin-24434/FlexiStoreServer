import { Request, Response, NextFunction } from "express";

// Define a custom error type (optional)
interface AppError extends Error {
  status?: number;
}

// Global error handler middleware
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred.";

  console.error("Error:", {
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};
