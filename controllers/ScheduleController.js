const {
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} = require("../model/Schedule");

// ✅ Ambil Semua Jadwal
const getAllSchedules = async(req, res) => {
    try {
        const data = await getSchedule();
        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data jadwal",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil data jadwal:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data jadwal",
            error: error.message,
        });
    }
};

// ✅ Tambah Jadwal Baru
const createNewSchedule = async(req, res) => {
    try {
        const data = await createSchedule(req.body);
        res.status(201).json({
            status: 201,
            message: "Berhasil membuat jadwal",
            data: data,
        });
    } catch (error) {
        console.error("Error saat menambahkan jadwal:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menambahkan jadwal",
            error: error.message,
        });
    }
};

// ✅ Update Jadwal
const updateExistingSchedule = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await updateSchedule(req.body, id);
        res.status(200).json({
            status: 200,
            message: "Berhasil mengupdate jadwal",
            data: data,
        });
    } catch (error) {
        console.error("Error saat memperbarui jadwal:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat memperbarui jadwal",
            error: error.message,
        });
    }
};

// ✅ Hapus Jadwal
const deleteExistingSchedule = async(req, res) => {
    try {
        const { id } = req.params;
        await deleteSchedule(id);
        res.status(200).json({
            status: 200,
            message: "Berhasil menghapus jadwal",
        });
    } catch (error) {
        console.error("Error saat menghapus jadwal:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus jadwal",
            error: error.message,
        });
    }
};

module.exports = {
    getAllSchedules,
    createNewSchedule,
    updateExistingSchedule,
    deleteExistingSchedule,
};