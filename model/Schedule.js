const backend = require("../configuration/database");

// ✅ Ambil Semua Jadwal
const getSchedules = async() => {
    try {
        const [results] = await backend.query(`
      SELECT id, barber_name, date, start_time, end_time, status, created_at, updated_at 
      FROM schedules 
      ORDER BY date ASC, start_time ASC
    `);
        return results;
    } catch (err) {
        console.error("Error saat mengambil data schedules:", err);
        throw new Error("Gagal mengambil data jadwal.");
    }
};

// ✅ Ambil Jadwal Berdasarkan ID
const getScheduleById = async(id) => {
    try {
        const [results] = await backend.query(`
      SELECT id, barber_name, date, start_time, end_time, status, created_at, updated_at 
      FROM schedules 
      WHERE id = ?
    `, [id]);

        return results[0] || null;
    } catch (err) {
        console.error("Error saat mengambil jadwal:", err);
        throw new Error("Gagal mengambil jadwal.");
    }
};

// ✅ Tambah Jadwal Baru
const createSchedule = async({ barber_name, date, start_time, end_time, status = 'available' }) => {
    try {
        const sql = `
      INSERT INTO schedules (barber_name, date, start_time, end_time, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
        const [result] = await backend.query(sql, [barber_name, date, start_time, end_time, status]);
        return result;
    } catch (err) {
        console.error("Error saat menambahkan jadwal:", err);
        throw new Error("Gagal menambahkan jadwal.");
    }
};

// ✅ Update Jadwal
const updateSchedule = async(id, { barber_name, date, start_time, end_time, status }) => {
    try {
        // Pastikan jadwal ada
        const schedule = await getScheduleById(id);
        if (!schedule) {
            throw new Error("Jadwal tidak ditemukan!");
        }

        const sql = `
      UPDATE schedules 
      SET barber_name = ?, date = ?, start_time = ?, end_time = ?, status = ? 
      WHERE id = ?
    `;
        const [result] = await backend.query(sql, [barber_name, date, start_time, end_time, status, id]);
        return result;
    } catch (err) {
        console.error("Error saat memperbarui jadwal:", err);
        throw new Error("Gagal memperbarui jadwal.");
    }
};

// ✅ Hapus Jadwal
const deleteSchedule = async(id) => {
    try {
        const sql = "DELETE FROM schedules WHERE id = ?";
        const [result] = await backend.query(sql, [id]);
        return result;
    } catch (err) {
        console.error("Error saat menghapus jadwal:", err);
        throw new Error("Gagal menghapus jadwal.");
    }
};

module.exports = {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};