const Admin = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "havenly_admin_super_secret_jwt_key_2026";

/**
 * Admin Login Controller
 * Authenticates admin via username, email, and password.
 */
const loginAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!email && !username)) {
      return res.status(400).json({
        success: false,
        message: "Please provide your username, email, and password.",
      });
    }

    const cleanEmail = email ? email.toLowerCase().trim() : null;
    const cleanUsername = username ? username.trim() : null;

    // Search query: by email or username
    const query = [];
    if (cleanEmail) query.push({ email: cleanEmail });
    if (cleanUsername) query.push({ username: cleanUsername });

    let admin = await Admin.findOne({ $or: query });

    // Fallback: If database admin isn't created yet, check against process.env
    if (!admin) {
      const envUsername = process.env.ADMIN_USERNAME?.trim();
      const envEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
      const envPassword = process.env.ADMIN_PASSWORD;

      const matchesEnv =
        (cleanEmail === envEmail || cleanUsername === envUsername) &&
        password === envPassword;

      if (matchesEnv) {
        const token = jwt.sign(
          {
            username: envUsername,
            email: envEmail,
            role: "super_admin",
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(200).json({
          success: true,
          message: "Admin login successful",
          token,
          admin: {
            username: envUsername,
            email: envEmail,
            role: "super_admin",
          },
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Please verify your details.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is deactivated. Contact the system administrator.",
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Please verify your details.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during admin authentication.",
    });
  }
};

/**
 * Forgot Password Controller
 */
const forgotPassword = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email && !username) {
      return res.status(400).json({
        success: false,
        message: "Please provide your registered admin email or username.",
      });
    }

    const cleanEmail = email ? email.toLowerCase().trim() : null;
    const cleanUsername = username ? username.trim() : null;

    const query = [];
    if (cleanEmail) query.push({ email: cleanEmail });
    if (cleanUsername) query.push({ username: cleanUsername });

    const admin = await Admin.findOne({ $or: query });

    // Also check env credentials
    const envEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const envUsername = process.env.ADMIN_USERNAME?.trim();
    const matchesEnv = cleanEmail === envEmail || cleanUsername === envUsername;

    if (!admin && !matchesEnv) {
      return res.status(404).json({
        success: false,
        message: "No administrator record found with the provided details.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset instructions have been dispatched to ${cleanEmail || envEmail}.`,
    });
  } catch (error) {
    console.error("Admin forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process password reset request.",
    });
  }
};

module.exports = {
  loginAdmin,
  forgotPassword,
};
