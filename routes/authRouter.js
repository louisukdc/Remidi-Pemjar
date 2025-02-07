const express = require("express");
const authRouter = express.Router();
const { userlogin, register, verifyToken } = require("../controllers/authController");
const authenticateToken = require("../middlewares/auth");

// 🔑 Login User
authRouter.post("/masuk", userlogin);

// 📝 Register User
authRouter.post("/register", register);

// 🔒 Verifikasi Token (Cek apakah token masih valid)
authRouter.get("/verify-token", authenticateToken, verifyToken);

module.exports = authRouter;