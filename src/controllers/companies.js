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
                response.err(res, err, err.message);
            });
    },
    addCompany: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) response.err(res, err);
            else {
                const data = {id: uuidv4(),...fields};
                models.addCompany(data)
                    .then(result => response.ok(res, data, 'Company created', 201))
                    .catch(err => {
                        response.err(res, err, 'Failed to add company');
                    });
            }
        });
    },
    updateCompany: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) response.err(res, err);
            else {
                const data = fields;
                models.updateCompany(data)
                    .then(result => response.ok(res, data, 'Company updated'))
                    .catch(err => response.err(res, err, 'Failed to update company'));
            }
        });
    },
    deleteCompany: (req, res) => {
        const data = req.body.id
        models.deleteCompany(data)
            .then(result => response.ok(res, data, 'Company deleted'))
            .catch(err => response.err(res, err, 'Failed to delete company'));
    }
};