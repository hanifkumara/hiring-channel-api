const db = require('../config/db');

const log = console.log;

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
                if (result.affectedRows > 0) resolve(result);
                else reject(new Error(err || 'Failed to add company!'));
            });
        });
    },
    updateCompany: data => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE company SET ? WHERE id = ?', [data, data.id], (err, result) => {
                if (result.affectedRows > 0) resolve(result);
                else reject(new Error(err || 'Company not found!'));
            });
        });
    },
    deleteCompany: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM company WHERE id = ?', id, (err, result) => {
                if (result.affectedRows > 0) resolve(result);
                else reject(new Error(err || 'Company not found!'));
            });
        });
    }
};