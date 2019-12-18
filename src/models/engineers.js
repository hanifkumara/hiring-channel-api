const db = require('../config/db');

const log = console.log;

module.exports = {
    getEngineers: placeholder => {
        const perfectQuery = 'SELECT engineer.id, engineer.name, engineer.skills, engineer.salary, TIMESTAMPDIFF(MINUTE, engineer.updated, now()) AS updated, engineer.img, user.email FROM engineer INNER JOIN user on engineer.id = user.id WHERE NOT name = "Luhut Andreas" AND name LIKE ? AND skills LIKE ? ORDER BY ?? LIMIT ?, ?';
        return new Promise((resolve, reject) => {
            db.query('SELECT engineer.id, engineer.name, engineer.skills, engineer.salary, TIMESTAMPDIFF(MINUTE, engineer.updated, now()) AS updated, engineer.img, user.email FROM engineer INNER JOIN user on engineer.id = user.id WHERE NOT name = "Luhut Andreas" AND (name LIKE ? OR skills LIKE ? OR salary LIKE ?) ORDER BY ?? LIMIT ?, ?', placeholder, (err, result) => {
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