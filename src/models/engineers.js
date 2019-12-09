const db = require('../config/db');

const log = console.log;

module.exports = {
    getEngineers: placeholder => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM engineer WHERE name LIKE ? AND skills LIKE ? ORDER BY ??', placeholder, (err, result) => {
                if (err) reject(new Error(err));
                else resolve(result);
            });
        });
    },
    addEngineers: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO engineer SET ?', data, (err, result) => {
                if (err) reject(new Error(err));
                else resolve(result);
            });
        });
    },
    updateEngineer: data => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE engineer SET ? WHERE id = ?', [data, data.id], (err, result) => {
                if (result.affectedRows > 0) resolve(result);
                else reject(new Error(err));
            });
        });
    },
    deleteEngineer: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM engineer WHERE id = ?', id, (err, result) => {
                if (result.affectedRows > 0) resolve(result);
                else reject(new Error(err));
            });
        });
    }
}