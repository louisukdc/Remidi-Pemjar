const express = require("express");
const bookingRouter = express.Router();
const {
    getDataBooking,
    createDataBooking,
    deleteDataBooking,
    getDataBookingById,
} = require("../controllers/BookingController");
const authenticateToken = require("../middlewares/auth");

// 📌 Ambil Semua Data Booking
bookingRouter.get("/", authenticateToken, getDataBooking);


// 🔍 Ambil Data Booking Berdasarkan ID
bookingRouter.get("/:id", authenticateToken, getDataBookingById);

// 📝 Buat Booking Baru
bookingRouter.post("/", authenticateToken, createDataBooking);

// ✏️ Update Status Booking
// bookingRouter.put("/:id", authenticateToken, updateDataStatus);

// ❌ Hapus Booking
bookingRouter.delete("/:id", authenticateToken, deleteDataBooking);

module.exports = bookingRouter;