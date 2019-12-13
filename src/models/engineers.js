const db = require('../config/db');

const log = console.log;

module.exports = {
    getEngineers: placeholder => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM engineer WHERE NOT name = "admin" AND name LIKE ? AND skills LIKE ? ORDER BY ?? LIMIT ?, ?', placeholder, (err, result) => {
                if (err) reject(new Error('Data tidak ditemukan'));
                else resolve(result);
            });
        });
    },
    addEngineer: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO engineer SET ?', data, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Failed to add engineer'));
                else resolve(result);
            });
        });
    },
    updateEngineer: data => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE engineer SET ? WHERE id = ?', [data, data.id], (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Engineer not found!'));
                else resolve(result);
            });
        });
    },
    deleteEngineer: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM engineer WHERE id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Engineer not found!'));
                else resolve(result);
            });
        });
    }
}