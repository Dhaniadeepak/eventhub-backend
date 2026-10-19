import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, "User registered successfully", user));
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, "Login successful", result));
};