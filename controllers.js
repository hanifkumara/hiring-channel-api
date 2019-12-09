const db = require('./connection');
const response = require('./responses');
const uuidv4 = require('uuid/v4');

const lib = require('./lib');
const log = console.log;

module.exports = {
    company: {
        data: (req, res) => {
            db.query('SELECT * FROM company', (err, result) => {
                if (err) {
                    response.err(res);
                    lib.sqlCheck(err);
                } else {
                    response.ok(res, result);
                }
            });
        },
        add: (req, res) => {
            lib.formData(req, fields => {
                const data = {id: uuidv4(), ...fields};
                db.query('INSERT INTO company SET ?', data, (err, result) => {
                    if (err) {
                        response.err(res);
                        lib.sqlCheck(err);
                    } else {
                        response.ok(res, data, 'Company created', 201);
                    }
                });
            });
        },
        update: (req, res) => {
            lib.formData(req, data => {
                db.query('UPDATE company SET ? WHERE id = ?', [data, data.id], (err, result) => {
                    if (err || result.affectedRows == 0) {
                        response.err(res);
                        lib.sqlCheck(err);
                    } else {
                        response.ok(res, data, 'Company updated');
                    }
                });
            });

        },
        delete: (req, res) => {
            const id = req.body.id;

            db.query('DELETE FROM company WHERE id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) {
                    response.err(res);
                    lib.sqlCheck(err);
                } else {
                    response.ok(res, id, 'Company deleted');
                }
            });
        }

    },
    engineer: {
        data: (req, res) => {
            let {sort = 'updated', name = '', skills = '', page = 1, show = 3} = req.query;
            let placeholder = [`%${name}%`, `%${skills}%`, sort];

            // Assign query to variable
            const query = db.query('SELECT * FROM engineer WHERE name LIKE ? AND skills LIKE ? ORDER BY ??', placeholder, (err, result) => {
                if (err) {
                    response.err(res);
                    lib.sqlCheck(err);
                } else {
                    const data = lib.pagination(result, page, show);
                    response.ok(res, data);
                }
            });
            // Log query without arrow function
            // log(query.sql);

        },
        add: (req, res) => {
            lib.formData(req, fields => {
                const data = {id: uuidv4(), created: lib.date(), updated: lib.date(), ...fields};
    
                // Use standard function for debug this.query
                db.query('INSERT INTO engineer SET ?', data, function (err, result) {
                    if (err) {
                        response.err(res);
                        lib.sqlCheck(err);
                    } else {
                        response.ok(res, data, 'Engineer created', 201);
    
                        // log sql query
                        // log(this.sql);
                    }
                });
            });
        },
        update: (req, res) => {
            lib.formData(req, fields => {
                const data = {id: uuidv4(), created: lib.date(), updated: lib.date(), ...fields};

                db.query('UPDATE engineer SET ? WHERE id = ?', [data, data.id], (err, result) => {
                    if (err || result.affectedRows == 0) {
                        response.err(res);
                        lib.sqlCheck(err);
                    } else {
                        response.ok(res, data, 'Engineer updated');
                    }
                });
            });
        },
        delete: (req, res) => {
            const id = req.body.id;

            db.query('DELETE FROM engineer WHERE id = ?', id, (err, result) => {
                if (err || result.affectedRows == 0) {
                    response.err(res);
                    lib.sqlCheck(err);
                } else {
                    response.ok(res, id, 'Engineer deleted');
                    log(result);
                }
            });
        }
    }
};