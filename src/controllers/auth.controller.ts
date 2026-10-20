import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const register = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, "User registered successfully", user));
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, "Login successful", result));
};

export const refresh = async (req: Request, res: Response) => {
  const tokens = await authService.refreshTokens(req.body.refreshToken);
  res.status(200).json(new ApiResponse(200, "Tokens refreshed", tokens));
};

export const logout = async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Not authenticated");
  await authService.logoutUser(req.user.id);
  res.status(200).json(new ApiResponse(200, "Logged out successfully"));
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Not authenticated");
  const user = await authService.getMe(req.user.id);
  res.status(200).json(new ApiResponse(200, "Current user", user));
};