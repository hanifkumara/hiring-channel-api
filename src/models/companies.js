const db = require("../config/db");

const log = console.log;

module.exports = {
  getCompanies: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM company WHERE NOT img = "" AND NOT description =""', (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getCompanyById: placeholder => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT company.id, name, description, location, img, email FROM company INNER JOIN user on company.id = user.id WHERE company.id = ?",
        placeholder,
        (err, result) => {
          if (err) reject(new Error("Data tidak ditemukan"));
          else resolve(result);
        }
      );
    });
  },
  addCompany: data => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO company SET ?", data, (err, result) => {
        if (err || result.affectedRows == 0)
          reject(err || new Error("Failed to add company!"));
        else resolve(result);
      });
    });
  },
  updateCompany: data => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE company SET ? WHERE id = ?",
        [data, data.id],
        (err, result) => {
          if (err || result.affectedRows == 0)
            reject(err || new Error("Company not found!"));
          else resolve(result);
        }
      );
    });
  },
  deleteCompany: id => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE company, user FROM company INNER JOIN user ON company.id = user.id WHERE user.id = ?",
        id,
        (err, result) => {
          if (err || result.affectedRows == 0)
            reject(err || new Error("Company not found!"));
          else resolve(result);
        }
      );
    });
  }
};
