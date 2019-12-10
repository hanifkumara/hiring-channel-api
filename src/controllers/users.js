const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

const models = require('../models/users');
const response = require('../lib/responses');
const lib = require('../lib');
const log = console.log;
const saltRounds = 10;

module.exports = {
    loginCompany: (req, res) => {
        models.getUser(req.body.user)
            .then(result => {
                const {password, username: user} = result[0];
                bcrypt.compare(req.body.password, password).then(isValid => {
                    if(isValid == false) response.err(res, new Error(), "Wrong password!")
                    else response.ok(res, user, 'Loggin success');
                });
            })
            .catch(err => response.err(res, err, "Couldn't find your account"))
    },
    signupCompany: (req, res) => {
        lib.formData(req, (err, fields) => {
            if(err) response.err(res, err);
            else {

                const id = uuidv4();
                const data = {
                    company: {
                        id,
                        name: fields.name,
                        img: fields.img,
                        location: fields.location,
                        description: fields.description,
                    },
                    user: {
                        id,
                        email: fields.email,
                        username: fields.username,
                        password: fields.password,
                        level: 'company'
                    }
                }

                bcrypt.hash(data.user.password, saltRounds).then(hash => {
                    data.user.password = hash;
                    models.regisUser(data.user)
                        .then(result => {
                            models.addCompany(data.company)
                                .then(result => response.ok(res, data, 'Register successfully', 201))
                                .catch(err => {
                                    models.deleteUser(id)
                                        .then(() => response.err(res, err, 'Ops, register failed'))
                                        .catch(err => response.err(res, err, 'Ops, register failed'))
                                });
                        })
                        .catch(err => response.err(res, err, 'Username or email alread registered'));
                });
            }
        });
    }
};