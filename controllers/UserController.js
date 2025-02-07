const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../model/User");

// ✅ Ambil Semua User
const getDataUser = async(req, res) => {
    try {
        const data = await getUsers();
        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data user",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil data user:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message,
        });
    }
};

// ✅ Ambil User Berdasarkan ID
const getDataUserById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "User tidak ditemukan",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Berhasil mendapatkan data user",
            data: data,
        });
    } catch (error) {
        console.error("Error saat mengambil user:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message,
        });
    }
};

// ✅ Tambah User Baru
const createDataUser = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                status: 400,
                message: "Mohon lengkapi username, email, password, dan role",
            });
        }

        const newUser = await createUser({ username, email, password, role });

        res.status(201).json({
            status: 201,
            message: "Berhasil menambahkan user",
            data: newUser,
        });
    } catch (error) {
        console.error("Error saat menambahkan user:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menambahkan user",
            error: error.message,
        });
    }
};

// ✅ Update User
const updateDataUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID user tidak valid",
            });
        }

        const updatedUser = await updateUser(id, { username, email, role });

        res.status(200).json({
            status: 200,
            message: "Berhasil memperbarui user",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error saat memperbarui user:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat memperbarui user",
            error: error.message,
        });
    }
};

// ✅ Hapus User
const deleteDataUser = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "ID user tidak valid",
            });
        }

        await deleteUser(id);

        res.status(200).json({
            status: 200,
            message: "Berhasil menghapus user",
        });
    } catch (error) {
        console.error("Error saat menghapus user:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus user",
            error: error.message,
        });
    }
};

module.exports = {
    getDataUser,
    getDataUserById,
    createDataUser,
    updateDataUser,
    deleteDataUser,
};