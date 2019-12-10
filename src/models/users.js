const db = require('../config/db');

const log = console.log;

module.exports = {
    regisUser: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', data, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Failed to add company!'));
                else resolve(result);
            });
        });
    },
    deleteUser: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE user.id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Company not found!'));
                else resolve(result);
            });
        });
    },
    getUser: user => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM user WHERE username = '${user}' OR email = '${user}'`, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('User not found'));
                else resolve(result);
            });
        });
    }
};