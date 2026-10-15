
const express = require("express");
const router = express.Router();

const { loginAdmin, forgotPassword } = require("../controllers/adminAuth.controller");

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);

module.exports = router;
