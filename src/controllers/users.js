const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const models = require('../models/users');
const response = require('../lib/responses');
const lib = require('../lib');
const log = console.log;
const saltRounds = 10;

module.exports = {
    userLogin: (req, res) => {
        models.getUser(req.body.user)
            .then(result => {
                const {password, username: user, level} = result[0];
                bcrypt.compare(req.body.password, password).then(isValid => {
                    if(isValid == false) response.err(res, new Error(), "Wrong password!")
                    else {
                        jwt.sign({user, level}, process.env.AUTH_SECRET, (err, token) => {
                            if(err) response.err(req, err);
                            else response.ok(res, {user, level, token}, 'Loggin success');
                        });
                    }
                });
            })
            .catch(err => response.err(res, err, "Couldn't find your account"))
    },
    userSignUp: (req, res) => {
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