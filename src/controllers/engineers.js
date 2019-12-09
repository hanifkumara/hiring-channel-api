const uuidv4 = require('uuid/v4');


const models = require('../models/engineers');
const response = require('../lib/responses');
const lib = require('../lib');
const log = console.log;

module.exports = {
    getEngineers: (req, res) => {
        let {sort = 'updated', name = '', skills = '', page = 1, show = 3} = req.query;
        let placeholder = [`%${name}%`, `%${skills}%`, sort];
        models.getEngineers(placeholder)
            .then(result => {
                const data = lib.pagination(result, page, show);
                response.ok(res, data);
            })
            .catch(err => {
                response.err(res);
                lib.sqlCheck(err);
            });
    },
    addEngineer: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) log(err);
            else {
                const data = {
                    id: uuidv4(),
                    created: lib.date(),
                    updated: lib.date(),
                    ...fields
                };
                models.addEngineers(data)
                    .then(result => response.ok(res, data, 'Engineer created', 201))
                    .catch(err => {
                        response.err(res);
                        lib.sqlCheck(err);
                    });
            }
        })
    },
    updateEngineer: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) log(err);
            else {
                const data = {
                    id: uuidv4(),
                    created: lib.date(),
                    updated: lib.date(),
                    ...fields
                };
                models.updateEngineer(data)
                    .then(result => response.ok(res, data, 'Engineer updated'))
                    .catch(err => {
                        response.err(res);
                        lib.sqlCheck(err);
                    });
            }
        })
    },
    deleteEngineer: (req, res) => {
        models.deleteEngineer(req.body)
            .then(result => response.ok(res, data, 'Engineer updated'))
            .catch(err => {
                response.err(res);
                lib.sqlCheck(err);
            });
    }
}