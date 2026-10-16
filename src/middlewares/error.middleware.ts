import type { ErrorRequestHandler, RequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js"; 
import { env } from "../config/env.js";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = err.message;
    } else if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID or value format";
    } else if ((err as { code?: number }).code === 11000) {
      statusCode = 409;
      message = "Duplicate value. Resource already exists";
    } else if (env.NODE_ENV !== "production") {
      message = err.message; // show real message in dev only
    }
  }

  if (statusCode === 500) {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(env.NODE_ENV === "development" && err instanceof Error && { stack: err.stack }),
  });
};