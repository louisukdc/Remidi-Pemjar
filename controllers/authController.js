const jwt = require("jsonwebtoken");
const { loginUser, createUser } = require("../model/User");

// ✅ Login User
const userlogin = async(req, res) => {
    try {
        const data = await loginUser(req.body);

        if (data.status === 401) {
            return res.status(401).json({
                status: 401,
                message: data.message,
            });
        }

        res.status(200).json({
            status: 200,
            message: "Berhasil login",
            data: {
                id: data.id,
                role: data.role,
                token: data.token,
            },
        });
    } catch (error) {
        console.error("Error saat login:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat login",
            error: error.message,
        });
    }
};

// ✅ Register User
const register = async(req, res) => {
    try {
        const data = await createUser(req.body);

        if (data.status === 400) {
            return res.status(400).json({
                status: 400,
                message: data.message,
            });
        }

        res.status(201).json({
            status: 201,
            message: "Berhasil mendaftar",
            data: {
                id: data.id,
                username: data.username,
                email: data.email,
            },
        });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat registrasi",
            error: error.message,
        });
    }
};

// ✅ Cek Token & Autentikasi Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            status: 403,
            message: "Token tidak ditemukan",
        });
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Token tidak valid",
            });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    userlogin,
    register,
    verifyToken,
};