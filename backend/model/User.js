const backend = require("../configuration/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Ambil Semua User
const getUsers = async() => {
    try {
        const [results] = await backend.query("SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC");
        return results;
    } catch (err) {
        console.error(err);
        throw new Error("Terjadi kesalahan saat mengambil data user.");
    }
};

// ✅ Ambil User Berdasarkan ID
const getUserById = async(id) => {
    try {
        const [results] = await backend.query("SELECT id, username, email, role, created_at FROM users WHERE id = ?", [id]);
        return results[0] || null;
    } catch (err) {
        console.error(err);
        throw new Error("Terjadi kesalahan saat mengambil data user.");
    }
};

// ✅ Tambah User Baru
const createUser = async({ username, email, password }) => {
    try {
        const sqlCheckEmail = "SELECT email FROM users WHERE email = ?";
        const [existingUser] = await backend.query(sqlCheckEmail, [email]);

        if (existingUser.length > 0) {
            return { status: 400, message: "Email is already in use" };
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const sqlInsert =
            "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        const [result] = await backend.query(sqlInsert, [
            username,
            email,
            hashedPassword,
        ]);

        return { status: 201, message: "User registered successfully" };
    } catch (err) {
        console.error(err);
        return { status: 500, message: "Internal Server Error" };
    }
};

// ✅ Update Data User
const updateUser = async(id, { username, email, role }) => {
    try {
        const sql = "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?";
        const [result] = await backend.query(sql, [username, email, role, id]);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error("Terjadi kesalahan saat memperbarui data user.");
    }
};

// ✅ Hapus User
const deleteUser = async(id) => {
    try {
        const sql = "DELETE FROM users WHERE id = ?";
        const [result] = await backend.query(sql, [id]);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error("Terjadi kesalahan saat menghapus user.");
    }
};

const loginUser = async({ email, password }) => {
    try {
        // 🔹 Cek apakah email ada di database
        const [users] = await backend.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            throw new Error("Email atau password salah.");
        }

        const user = users[0];

        // 🔹 Cek password dengan bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Email atau password salah.");
        }

        // 🔹 Generate JWT Token
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET, { expiresIn: "1h" } // Token berlaku 1 jam
        );

        // 🔹 Hapus password dari response untuk keamanan
        delete user.password;

        return { user, token };
    } catch (err) {
        console.error(err);
        throw new Error("Terjadi kesalahan saat login.");
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};