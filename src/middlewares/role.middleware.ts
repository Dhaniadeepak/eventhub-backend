import type { RequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";
import type { Role } from "../models/user.model.js";

export const authorize = (...roles: Role[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authenticated"));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission to do this"));
    }
    next();
  };
};