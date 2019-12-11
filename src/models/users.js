const db = require('../config/db');
const {addCompany} = require('./companies');
const {addEngineer} = require('./engineers');

const log = console.log;

module.exports = {
    addCompany,
    addEngineer,
    regisUser: data => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', data, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('Sign up failed'));
                else resolve(result);
            });
        });
    },
    deleteUser: id => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE user.id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) reject(err || new Error('User not found!'));
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