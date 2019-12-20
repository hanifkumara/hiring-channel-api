const uuidv4 = require("uuid/v4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { updateCompany } = require("./companies");
const { updateEngineer } = require("./engineers");
const models = require("../models/users");
const response = require("../lib/responses");
const lib = require("../lib");

const log = console.log;
const saltRounds = 10;

// klo gak abis regis langsung masukin ke company/eng tapi isinya undefined, trus nanti di quey pake where not undefined, jadi si user coman bisa update

module.exports = {
  sendMsg: (req, res) => {
    try {
      const { id } = jwt.verify(req.query.token, process.env.AUTH_SECRET);
      models
        .sendMsg({ sender: id, ...req.body })
        .then(result => response.ok(res, result, "Message sent"))
        .catch(err => response.err(res, err, "Cannot send message"));
    } catch {
      response.err(req, err);
    }
  },
  getMsg: (req, res) => {
    try {
      const { id } = jwt.verify(req.query.token, process.env.AUTH_SECRET);
      models
        .getMsg(id)
        .then(result => response.ok(res, result, "Sucessfully get message"))
        .catch(err => response.err(res, err, "Cannot get message"));
    } catch {
      response.err(req, err);
    }
  },
  update: (req, res) => {
    try {
      const { role } = jwt.verify(req.query.token, process.env.AUTH_SECRET);
      if (role == "company") {
        updateCompany(req, res);
      } else if (role == "engineer") {
        updateEngineer(req, res);
      } else {
        response.err(req, err);
      }
    } catch (err) {
      response.err(req, err);
    }
  },
  userLogin: (req, res) => {
    models
      .getUser(req.body.user)
      .then(result => {
        const { password, id, level, role } = result[0];
        bcrypt.compare(req.body.password, password).then(isValid => {
          if (isValid == false)
            response.err(res, new Error(), "Wrong password!");
          else {
            // Simpen di file auth
            jwt.sign(
              { id, level, role },
              process.env.AUTH_SECRET,
              (err, token) => {
                if (err) response.err(req, err);
                else {
                  const username = result[0].username;
                  response.ok(
                    res,
                    { id, username, level, role, token },
                    "Loggin success"
                  );
                }
              }
            );
          }
        });
      })
      .catch(err => response.err(res, err, "Couldn't find your account"));
  },
  userSignUp: (req, res) => {
    let role = req.url.split("/")[1] == "companies" ? "company" : "engineer";
    const id = uuidv4();
    const ue = { id, name: req.body.name };

    delete req.body.name;
    const data = {
      id,
      role,
      level: "1",
      ...req.body
    };
    log(req.body);
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        response.err(res, err, "Something went wrong");
      } else {
        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) {
            log(data);
            response.err(res, err, "Something went wrong");
          } else {
            data.password = hash;
            models
              .regisUser(data)
              .then(result => {
                if (role == "company") {
                  log("comp");
                  models
                    .addCompany(ue)
                    .then(result =>
                      response.ok(res, ue, "Register successfully", 201)
                    )
                    .catch(err => {
                      models
                        .deleteUser(id)
                        .then(() =>
                          response.err(res, err, "Ops, register failed")
                        )
                        .catch(err =>
                          response.err(res, err, "Ops, register failed")
                        );
                    });
                } else {
                  engineer = {
                    created: lib.date(),
                    updated: lib.date(),
                    ...ue
                  };
                  models
                    .addEngineer(engineer)
                    .then(result =>
                      response.ok(res, engineer, "Register successfully", 201)
                    )
                    .catch(err => {
                      models
                        .deleteUser(id)
                        .then(() =>
                          response.err(res, err, "Ops, register failed")
                        )
                        .catch(err =>
                          response.err(res, err, "Ops, register failed")
                        );
                    });
                }
              })
              .catch(err =>
                response.err(res, err, "Username or email alread registered")
              );
          }
        });
      }
    });
  }
};
