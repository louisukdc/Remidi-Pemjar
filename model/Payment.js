const backend = require("../configuration/database");

// ✅ Ambil Semua Data Pembayaran
const getPayments = async() => {
    try {
        const [results] = await backend.query(`
      SELECT id, booking_id, amount, payment_method, status, transaction_date 
      FROM payments 
      ORDER BY transaction_date DESC
    `);
        return results;
    } catch (err) {
        console.error("Error saat mengambil data pembayaran:", err);
        throw new Error("Gagal mengambil data pembayaran.");
    }
};

// ✅ Ambil Data Pembayaran Berdasarkan ID
const getPaymentById = async(id) => {
    try {
        const [results] = await backend.query(`
      SELECT id, booking_id, amount, payment_method, status, transaction_date 
      FROM payments 
      WHERE id = ?
    `, [id]);

        return results[0] || null;
    } catch (err) {
        console.error("Error saat mengambil pembayaran:", err);
        throw new Error("Gagal mengambil pembayaran.");
    }
};

// ✅ Tambah Pembayaran Baru
const createPayment = async({ booking_id, amount, payment_method, status = 'pending' }) => {
    try {
        const sql = `
      INSERT INTO payments (booking_id, amount, payment_method, status) 
      VALUES (?, ?, ?, ?)
    `;
        const [result] = await backend.query(sql, [booking_id, amount, payment_method, status]);
        return result;
    } catch (err) {
        console.error("Error saat menambahkan pembayaran:", err);
        throw new Error("Gagal menambahkan pembayaran.");
    }
};

// ✅ Perbarui Status Pembayaran
const updatePayment = async(id, { amount, payment_method, status }) => {
    try {
        // Pastikan pembayaran ada
        const payment = await getPaymentById(id);
        if (!payment) {
            throw new Error("Pembayaran tidak ditemukan!");
        }

        const sql = `
      UPDATE payments 
      SET amount = ?, payment_method = ?, status = ? 
      WHERE id = ?
    `;
        const [result] = await backend.query(sql, [amount, payment_method, status, id]);
        return result;
    } catch (err) {
        console.error("Error saat memperbarui pembayaran:", err);
        throw new Error("Gagal memperbarui pembayaran.");
    }
};

// ✅ Hapus Pembayaran
const deletePayment = async(id) => {
    try {
        const sql = "DELETE FROM payments WHERE id = ?";
        const [result] = await backend.query(sql, [id]);
        return result;
    } catch (err) {
        console.error("Error saat menghapus pembayaran:", err);
        throw new Error("Gagal menghapus pembayaran.");
    }
};

module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};