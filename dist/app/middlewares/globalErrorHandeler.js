"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "An unexpected error occurred.";
    let details = err.details || null;
    // Log error details for debugging purposes
    console.error("Error:", {
        message: err.message,
        stack: err.stack,
        details: err.details, // Optionally log additional details
    });
    // Specific handling for Prisma errors
    if (err.isPrismaError) {
        statusCode = 500;
        message = "Database error occurred!";
        details = "Prisma error details: " + err.message;
    }
    // Specific handling for PostgreSQL errors
    if (err.message.includes("ECONNREFUSED")) {
        statusCode = 500;
        message = "Unable to connect to the database.";
        details = "Database connection error (PostgreSQL). Please check if the database server is running.";
    }
    // Send the response with the error details
    res.status(statusCode).json({
        success: false,
        message,
        details, // Include additional details about the error
    });
};
exports.globalErrorHandler = globalErrorHandler;
