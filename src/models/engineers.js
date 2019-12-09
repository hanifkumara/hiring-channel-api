const db = require('../config/db');

module.exports = {
    getEngineers: placeholder => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM engineer WHERE name LIKE ? AND skills LIKE ? ORDER BY ??', placeholder, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    addEngineers: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO engineer SET ?', data, function (err, result) {
                if (err) reject(err);
                else {
                    resolve(result);
                    // Check sql query
                    // log(this.sql);
                }
            });
        });
    },
    updateEngineer: data => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE engineer SET ? WHERE id = ?', [data, data.id], (err, result) => {
                if (err || result.affectedRows == 0) reject(err);
                else resolve(result);
            });
        });
    },
    deleteEngineer: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM engineer WHERE id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) reject(err);
                else resolve(result);
            });
        });
    }
}