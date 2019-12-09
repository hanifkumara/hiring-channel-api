const db = require('../config/db');

module.exports = {
    getCompanies: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM company', (err, result) => {
                if (err) reject(new Error(err));
                else resolve(result);
            });
        });
    },
    addCompany: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO company SET ?', data, (err, result) => {
                if (err) reject(new Error(err));
                else resolve(result);
            });
        });
    },
    updateCompany: data => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE company SET ? WHERE id = ?', [data, data.id], (err, result) => {
                // Cek err siapa tau undefined
                if (err || result.affectedRows == 0) reject(new Error(err));
                else resolve(result);
            });
        });
    },
    deleteCompany: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM company WHERE id = ?', id, (err, result) => {
                // Cek err siapa tau undefined
                if (err || result.affectedRows == 0) reject(err);
                else resolve(result);
            });
        })
    }
};