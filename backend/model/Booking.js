const backend = require("../configuration/database");

// ✅ Ambil Semua Booking
const getBookings = async() => {
    try {
        const [results] = await backend.query(`
      SELECT id, user_id, service_id, schedule_id, status, created_at, updated_at 
      FROM bookings 
      ORDER BY created_at DESC
    `);
        return results;
    } catch (err) {
        console.error("Error saat mengambil data bookings:", err);
        throw new Error("Gagal mengambil data booking.");
    }
};

// ✅ Ambil Booking Berdasarkan ID
const getBookingById = async(id) => {
    try {
        const [results] = await backend.query(`
      SELECT id, user_id, service_id, schedule_id, status, created_at, updated_at 
      FROM bookings 
      WHERE id = ?
    `, [id]);

        return results[0] || null;
    } catch (err) {
        console.error("Error saat mengambil booking:", err);
        throw new Error("Gagal mengambil booking.");
    }
};

// ✅ Tambah Booking Baru
const createBooking = async({ user_id, service_id, schedule_id, status = 'pending' }) => {
    try {
        const sql = `
      INSERT INTO bookings (user_id, service_id, schedule_id, status) 
      VALUES (?, ?, ?, ?)
    `;
        const [result] = await backend.query(sql, [user_id, service_id, schedule_id, status]);
        return result;
    } catch (err) {
        console.error("Error saat menambahkan booking:", err);
        throw new Error("Gagal menambahkan booking.");
    }
};

// ✅ Update Booking
const updateBooking = async(id, { user_id, service_id, schedule_id, status }) => {
    try {
        // Pastikan booking ada
        const booking = await getBookingById(id);
        if (!booking) {
            throw new Error("Booking tidak ditemukan!");
        }

        const sql = `
      UPDATE bookings 
      SET user_id = ?, service_id = ?, schedule_id = ?, status = ? 
      WHERE id = ?
    `;
        const [result] = await backend.query(sql, [user_id, service_id, schedule_id, status, id]);
        return result;
    } catch (err) {
        console.error("Error saat memperbarui booking:", err);
        throw new Error("Gagal memperbarui booking.");
    }
};

// ✅ Hapus Booking
const deleteBooking = async(id) => {
    try {
        const sql = "DELETE FROM bookings WHERE id = ?";
        const [result] = await backend.query(sql, [id]);
        return result;
    } catch (err) {
        console.error("Error saat menghapus booking:", err);
        throw new Error("Gagal menghapus booking.");
    }
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
};