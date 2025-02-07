const express = require("express");
const scheduleRouter = express.Router();
const {
    getAllSchedules,
    createNewSchedule,
    updateExistingSchedule,
    deleteExistingSchedule,
} = require("../controllers/ScheduleController");
const authenticateToken = require("../middlewares/auth");

// 📌 Ambil Semua Jadwal
scheduleRouter.get("/", authenticateToken, getAllSchedules);

// ➕ Buat Jadwal Baru
scheduleRouter.post("/", authenticateToken, createNewSchedule);

// ✏️ Update Jadwal Berdasarkan ID
scheduleRouter.put("/:id", authenticateToken, updateExistingSchedule);

// ❌ Hapus Jadwal Berdasarkan ID
scheduleRouter.delete("/:id", authenticateToken, deleteExistingSchedule);

module.exports = scheduleRouter;