import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/admin-only", authenticate, authorize("admin"), (_req, res) => {
  res.json({ success: true, message: "Hello admin" });
});

router.use("/auth", authRoutes);

export default router;