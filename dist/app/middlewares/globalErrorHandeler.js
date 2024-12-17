"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
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
exports.globalErrorHandler = globalErrorHandler;
