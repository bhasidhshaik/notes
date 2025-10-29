import bcrypt from "bcryptjs";
import fs from "fs";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// ===================
// GET LOGGED-IN USER
// ===================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// UPDATE PROFILE
// ===================
export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const file = req.file;

    let updateData = { name, bio };

    if (file) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "profiles",
        resource_type: "image",
      });
      updateData.profile = upload.secure_url;
      fs.unlinkSync(file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// CHANGE PASSWORD
// ===================
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// GET ALL USERS
// ===================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
