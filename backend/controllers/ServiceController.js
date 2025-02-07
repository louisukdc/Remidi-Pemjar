const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} = require("../model/Service");

// ✅ Ambil Semua Layanan
const getAllServices = async(req, res) => {
    try {
        const data = await getServices();
        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data layanan",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil data layanan:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data layanan",
            error: error.message,
        });
    }
};

// ✅ Ambil Layanan Berdasarkan ID
const getService = async(req, res) => {
    try {
        const { id } = req.params;
        const service = await getServiceById(id);

        if (!service) {
            return res.status(404).json({
                status: 404,
                message: "Layanan tidak ditemukan",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data layanan",
            data: service,
        });
    } catch (error) {
        console.error("Error saat mengambil layanan:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data layanan",
            error: error.message,
        });
    }
};

// ✅ Tambah Layanan Baru
const createNewService = async(req, res) => {
    try {
        const { name, description, price, duration } = req.body;

        if (!name || !description || !price || !duration) {
            return res.status(400).json({
                status: 400,
                message: "Mohon lengkapi semua data layanan",
            });
        }

        const newService = await createService({ name, description, price, duration });

        res.status(201).json({
            status: 201,
            message: "Berhasil menambahkan layanan",
        });
    } catch (error) {
        console.error("Error saat menambahkan layanan:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menambahkan layanan",
            error: error.message,
        });
    }
};

// ✅ Update Layanan
const updateExistingService = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, duration } = req.body;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID layanan tidak valid",
            });
        }

        const updatedService = await updateService(id, { name, description, price, duration });

        res.status(200).json({
            status: 200,
            message: "Berhasil memperbarui layanan",
            data: updatedService,
        });
    } catch (error) {
        console.error("Error saat memperbarui layanan:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat memperbarui layanan",
            error: error.message,
        });
    }
};

// ✅ Hapus Layanan
const deleteExistingService = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID layanan tidak valid",
            });
        }

        await deleteService(id);

        res.status(200).json({
            status: 200,
            message: "Berhasil menghapus layanan",
        });
    } catch (error) {
        console.error("Error saat menghapus layanan:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus layanan",
            error: error.message,
        });
    }
};

module.exports = {
    getAllServices,
    getService,
    createNewService,
    updateExistingService,
    deleteExistingService,
};