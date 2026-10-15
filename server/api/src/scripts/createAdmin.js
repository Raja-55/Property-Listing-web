
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../db/connect");
const Admin = require("../models/Admin.model");

const createAdmin = async () => {
  try {
    await connectDB();


   const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Missing admin environment variables.");
    }

    const email = ADMIN_EMAIL.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("An admin with this email already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await Admin.create({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "super_admin",
      isActive: true,
    });

    console.log("Initial admin created successfully.");
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();