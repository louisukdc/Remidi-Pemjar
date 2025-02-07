const express = require("express");
const paymentRouter = express.Router();
const {
    getAllPayments,
    // createPayment,
    // updatePayment,
    // deletePayment,
} = require("../controllers/PaymentController");
const authenticateToken = require("../middlewares/auth");

// 📌 Ambil Semua Data Pembayaran
paymentRouter.get("/", authenticateToken, getAllPayments);


module.exports = paymentRouter;