
import jwt, { type SignOptions } from "jsonwebtoken";
import crypto from "node:crypto";
import type { StringValue } from "ms";
import { env } from "../config/env.js";

export interface TokenPayload {
  id: string;
  role: string;
}

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as StringValue,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const signRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as StringValue,
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;

export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;

export const hashToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");
