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
                response.err(res, err, err.message);
            });
    },
    addEngineer: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) response.err(res, err, err.message);
            else {
                const data = {
                    id: uuidv4(),
                    created: lib.date(),
                    updated: lib.date(),
                    ...fields
                };
                models.addEngineer(data)
                    .then(result => response.ok(res, data, 'Engineer created', 201))
                    .catch(err => response.err(res, err, err.message));
            }
        })
    },
    updateEngineer: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) {log(err); res.end();}
            else {
                const data = {
                    id: uuidv4(),
                    created: lib.date(),
                    updated: lib.date(),
                    ...fields
                };
                models.updateEngineer(data)
                    .then(result => response.ok(res, data, 'Engineer updated'))
                    .catch(err => response.err(res, err, err.message));
            }
        });
    },
    deleteEngineer: (req, res) => {
        const data = req.body.id
        models.deleteEngineer(data)
            .then(result => response.ok(res, data, 'Engineer deleted'))
            .catch(err => response.err(res, err, err.message));
    }
}