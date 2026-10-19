import type{ RequestHandler } from "express";
import { ZodType } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const validate =
  (schema: ZodType): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const msg = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", ");
      return next(new ApiError(400, msg));
    }
    req.body = result.data; // cleaned data (trimmed, lowercased)
    next();
  };