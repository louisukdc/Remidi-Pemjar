const express = require("express");
const userRouter = express.Router();
const {
    getDataUser,
    updateDataUser,
    deleteDataUser,
} = require("../controllers/UserController");
const authenticateToken = require("../middlewares/auth");

// 📌 Ambil Semua Data User
userRouter.get("/", authenticateToken, getDataUser);

// ✏️ Update Data User Berdasarkan ID
userRouter.put("/:id", authenticateToken, updateDataUser);

// ❌ Hapus User Berdasarkan ID
userRouter.delete("/:id", authenticateToken, deleteDataUser);

module.exports = userRouter;