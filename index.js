const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

// 🔹 Import Routers
const userRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");
const serviceRouter = require("./routes/serviceRouter"); // ✅ Tambahkan jika ada
const scheduleRouter = require("./routes/scheduleRouter"); // ✅ Tambahkan jika ada
const paymentRouter = require("./routes/paymentRouter"); // ✅ Tambahkan jika ada
const authRouter = require("./routes/authRouter");

// 🔹 Setup Express App
const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Gunakan Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/service", serviceRouter); // ✅ Tambahkan jika ada
app.use("/schedule", scheduleRouter); // ✅ Tambahkan jika ada
app.use("/payment", paymentRouter); // ✅ Tambahkan jika ada

// 🔹 Setup HTTP Server & Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

// 🔹 Socket.io Events
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("booking_update", (data) => {
        io.emit("update_bookings", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// 🔹 Jalankan Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server Running at PORT: ${PORT}`);
});