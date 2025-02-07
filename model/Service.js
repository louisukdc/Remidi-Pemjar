const backend = require("../configuration/database");

// ✅ Ambil Semua Layanan
const getServices = async() => {
    try {
        const [results] = await backend.query("SELECT id, name, description, price, duration, created_at, updated_at FROM services ORDER BY id ASC");
        return results;
    } catch (err) {
        console.error("Error saat mengambil data services:", err);
        throw new Error("Gagal mengambil data layanan.");
    }
};

// ✅ Ambil Layanan Berdasarkan ID
const getServiceById = async(id) => {
    try {
        const [results] = await backend.query("SELECT id, name, description, price, duration, created_at, updated_at FROM services WHERE id = ?", [id]);
        return results[0] || null;
    } catch (err) {
        console.error("Error saat mengambil service:", err);
        throw new Error("Gagal mengambil layanan.");
    }
};

// ✅ Tambah Layanan Baru
const createService = async({ name, description, price, duration }) => {
    try {
        const sql = "INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)";
        const [result] = await backend.query(sql, [name, description, price, duration]);
        return result;
    } catch (err) {
        console.error("Error saat menambahkan service:", err);
        throw new Error("Gagal menambahkan layanan.");
    }
};

// ✅ Update Layanan
const updateService = async(id, { name, description, price, duration }) => {
    try {
        // Pastikan ID valid
        const service = await getServiceById(id);
        if (!service) {
            throw new Error("Layanan tidak ditemukan!");
        }

        // Lakukan update
        const sql = "UPDATE services SET name = ?, description = ?, price = ?, duration = ? WHERE id = ?";
        const [result] = await backend.query(sql, [name, description, price, duration, id]);
        return result;
    } catch (err) {
        console.error("Error saat memperbarui service:", err);
        throw new Error("Gagal memperbarui layanan.");
    }
};

// ✅ Hapus Layanan
const deleteService = async(id) => {
    try {
        const sql = "DELETE FROM services WHERE id = ?";
        const [result] = await backend.query(sql, [id]);
        return result;
    } catch (err) {
        console.error("Error saat menghapus service:", err);
        throw new Error("Gagal menghapus layanan.");
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
};