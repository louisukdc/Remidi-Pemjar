const express = require("express");
const serviceRouter = express.Router();
const {
    getAllServices,
    createNewService,
    updateExistingService,
    deleteExistingService,
} = require("../controllers/ServiceController");
const authenticateToken = require("../middlewares/auth");

// 📌 Ambil Semua Layanan (Service)
serviceRouter.get("/", authenticateToken, getAllServices);

// ➕ Tambah Layanan Baru
serviceRouter.post("/", authenticateToken, createNewService);

// ✏️ Update Layanan Berdasarkan ID
serviceRouter.put("/:id", authenticateToken, updateExistingService);

// ❌ Hapus Layanan Berdasarkan ID
serviceRouter.delete("/:id", authenticateToken, deleteExistingService);

module.exports = serviceRouter;