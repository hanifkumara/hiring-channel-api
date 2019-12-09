const uuidv4 = require('uuid/v4');

const models = require('../models/companies');
const response = require('../lib/responses');
const lib = require('../lib');
const log = console.log;

module.exports = {
    getCompanies: (req, res) => {
        models.getCompanies()
            .then(result => response.ok(res, result))
            .catch(err => {
                response.err(res);
                lib.sqlCheck(err);
            });
    },
    addCompany: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) log(err);
            else {
                const data = {id: uuidv4(),...fields};
                models.addCompany(data)
                    .then(result => response.ok(res, data, 'Company created', 201))
                    .catch(err => {
                        response.err(res);
                        lib.sqlCheck(err);
                    });
            }
        })
    },
    updateCompany: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) log(err);
            else {
                const data = fields;
                models.updateCompany(data)
                    .then(result => response.ok(res, data, 'Company updated'))
                    .catch(err => {
                        response.err(res);
                        lib.sqlCheck(err);
                    });
            }
        })
    },
    deleteCompany: (req, res) => {
        models.deleteCompany(req.body.id)
            .then(result => response.ok(res, id, 'Company deleted'))
            .catch(err => {
                response.err(res);
                lib.sqlCheck(err);
            });
    }
}