import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
} from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/update", protect, upload.single("profile"), updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/all", getAllUsers); // Optional or admin-only later

export default router;
