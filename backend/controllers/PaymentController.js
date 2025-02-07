const {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} = require("../model/Payment");

// ✅ Ambil Semua Pembayaran
const getAllPayments = async(req, res) => {
    try {
        const data = await getPayments();
        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data pembayaran",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil data pembayaran:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data pembayaran",
            error: error.message,
        });
    }
};

// ✅ Ambil Pembayaran Berdasarkan ID
const getPaymentByID = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await getPaymentById(id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Pembayaran tidak ditemukan",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data pembayaran",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil pembayaran berdasarkan ID:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil pembayaran",
            error: error.message,
        });
    }
};

// ✅ Tambah Pembayaran Baru
const createNewPayment = async(req, res) => {
    try {
        const data = await createPayment(req.body);
        res.status(201).json({
            status: 201,
            message: "Berhasil menambahkan pembayaran",
            data: data,
        });
    } catch (error) {
        console.error("Error saat menambahkan pembayaran:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menambahkan pembayaran",
            error: error.message,
        });
    }
};

// ✅ Update Pembayaran
const updateExistingPayment = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await updatePayment(id, req.body);

        res.status(200).json({
            status: 200,
            message: "Berhasil memperbarui pembayaran",
            data: data,
        });
    } catch (error) {
        console.error("Error saat memperbarui pembayaran:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat memperbarui pembayaran",
            error: error.message,
        });
    }
};

// ✅ Hapus Pembayaran
const deleteExistingPayment = async(req, res) => {
    try {
        const { id } = req.params;
        await deletePayment(id);
        res.status(200).json({
            status: 200,
            message: "Berhasil menghapus pembayaran",
        });
    } catch (error) {
        console.error("Error saat menghapus pembayaran:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus pembayaran",
            error: error.message,
        });
    }
};

module.exports = {
    getAllPayments,
    getPaymentByID,
    createNewPayment,
    updateExistingPayment,
    deleteExistingPayment,
};