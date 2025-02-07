const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
} = require("../model/Booking");

// ✅ Ambil Semua Booking
const getDataBooking = async(req, res) => {
    try {
        const data = await getBookings();
        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data booking",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil data booking:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data booking",
            error: error.message,
        });
    }
};

// ✅ Ambil Booking Berdasarkan ID
const getDataBookingById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await getBookingById(id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Booking tidak ditemukan",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data booking",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil booking:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data booking",
            error: error.message,
        });
    }
};

// ✅ Tambah Booking Baru
const createDataBooking = async(req, res) => {
    try {
        const { user_id, service_id, schedule_id, status } = req.body;

        if (!user_id || !service_id || !schedule_id) {
            return res.status(400).json({
                status: 400,
                message: "Mohon lengkapi user_id, service_id, dan schedule_id",
            });
        }

        const newBooking = await createBooking({ user_id, service_id, schedule_id, status });

        res.status(201).json({
            status: 201,
            message: "Berhasil menambahkan booking",
            data: newBooking,
        });
    } catch (error) {
        console.error("Error saat menambahkan booking:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menambahkan booking",
            error: error.message,
        });
    }
};

// ✅ Update Booking
const updateDataBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const { user_id, service_id, schedule_id, status } = req.body;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID booking tidak valid",
            });
        }

        const updatedBooking = await updateBooking(id, { user_id, service_id, schedule_id, status });

        res.status(200).json({
            status: 200,
            message: "Berhasil memperbarui booking",
            data: updatedBooking,
        });
    } catch (error) {
        console.error("Error saat memperbarui booking:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat memperbarui booking",
            error: error.message,
        });
    }
};

// ✅ Hapus Booking
const deleteDataBooking = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID booking tidak valid",
            });
        }

        await deleteBooking(id);

        res.status(200).json({
            status: 200,
            message: "Berhasil menghapus booking",
        });
    } catch (error) {
        console.error("Error saat menghapus booking:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus booking",
            error: error.message,
        });
    }
};

module.exports = {
    getDataBooking,
    getDataBookingById,
    createDataBooking,
    updateDataBooking,
    deleteDataBooking,
};