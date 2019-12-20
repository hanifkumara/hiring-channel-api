const uuidv4 = require("uuid/v4");

const models = require("../models/engineers");
const response = require("../lib/responses");
const lib = require("../lib");
const log = console.log;

module.exports = {
  getEngineers: (req, res) => {
    let {
      sort = "updated",
      name = "",
      skills = "",
      salary = "",
      page = 1,
      show = 10
    } = req.query;
    const offset = (Number(page) - 1) * show;
    let placeholder = [
      `%${name}%`,
      `%${skills}%`,
      `%${salary}%`,
      sort,
      offset,
      Number(show)
    ];
    models
      .getEngineers(placeholder)
      .then(result => {
        const page = Number(req.query.page) || 1;
        const previousPage = page - 1 < 1 ? 1 : page - 1;
        const nextPage = result.length != show ? null : page + 1;
        const data = { page, previousPage, nextPage, result };
        response.ok(res, data);
      })
      .catch(err => {
        response.err(res, err, err.message);
      });
  },
  getEngineersByid: (req, res) => {
    models
      .getEngineersByid(req.params.id)
      .then(result => {
        response.ok(res, result);
      })
      .catch(err => {
        response.err(res, err, err.message);
      });
  },
  addEngineer: (req, res) => {
    lib.formData(req, (err, fields) => {
      if (err) response.err(res, err, err.message);
      else {
        const data = {
          id: uuidv4(),
          ...fields
        };
        models
          .addEngineer(data)
          .then(result => response.ok(res, data, "Engineer created", 201))
          .catch(err => response.err(res, err, err.message));
      }
    });
  },
  updateEngineer: (req, res) => {
    lib.formData(req, (err, fields) => {
      if (err) {
        response.err(res, err, err.message);
      } else {
        const data = {
          id: uuidv4(),
          ...fields
        };
        models
          .updateEngineer(data)
          .then(result => response.ok(res, data, "Engineer updated"))
          .catch(err => response.err(res, err, err.message));
      }
    });
  },
  deleteEngineer: (req, res) => {
    const data = req.body.id;
    models
      .deleteEngineer(data)
      .then(result => response.ok(res, data, "Engineer deleted"))
      .catch(err => response.err(res, err, err.message));
  }
};
