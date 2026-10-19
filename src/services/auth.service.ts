import { User, type IUser } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {
  signAccessToken,
  signRefreshToken,
  hashToken,
} from "../utils/tokens.js";
import type {
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator.js";

const toSafeUser = (user: IUser & { _id: unknown }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
});

export const registerUser = async (data: RegisterInput) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    ...(data.role && { role: data.role }),
  });
  return toSafeUser(user);
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user || !(await user.comparePassword(data.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const payload = { id: String(user._id), role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await User.updateOne(
    { _id: user._id },
    { refreshToken: hashToken(refreshToken) },
  );

  return { user: toSafeUser(user), accessToken, refreshToken };
};
