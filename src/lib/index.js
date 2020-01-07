const formidable = require("formidable");
const fs = require("fs");
const uuidv4 = require("uuid/v4");

const log = console.log;

function validExtension(ext, acceptableExts) {
  for (const acceptExt of acceptableExts) {
    if (acceptExt == ext) {
      return true;
    }
  }
}

module.exports = {
  date: () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  },
  cors: (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Acces-Control-Allow-Headers",
      "Origin, x-requested-with, Content-Type, Accept"
    );
    next();
  },
  pagination: (data, page, show = 5) => {
    const start = show * (page - 1);
    const end = show * page > data.length ? data.length : show * page;
    if (start > data.length) {
      return [];
    } else {
      const paging = [];
      for (let i = start; i < end; i++) {
        paging.push(data[i]);
      }
      return paging;
    }
  },
  formData: (req, callback) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 1024 * 1024;

    form.parse(req, (err, fields, files) => {
      if (err) {
        callback(err);
        return;
      } else if (
        Object.entries(files).length == 0 &&
        files.constructor == Object
      ) {
        callback(undefined, { ...fields });
        return;
      }

      const split = files.img.name.split(".");
      const ext = split[split.length - 1].toLocaleLowerCase();
      const acceptableExts = ["png", "jpg", "jpeg", "pdf"];

      if (validExtension(ext, acceptableExts) != true) {
        callback(
          new Error(
            "Invalid extension type, accepted is " + acceptableExts.join(", ")
          )
        );
      }

      const id = uuidv4();
      const fileDir = `public/assets/images/${id + "_" + files.img.name}`;
      const oldPath = files.img.path;
      const newPath = `${"src/" + fileDir}`;

      fs.copyFile(oldPath, newPath, err => {
        if (err) {
          err.message = "Failed to add engineer!";
          callback(err);
        } else {
          fs.unlink(oldPath, err => {
            if (err) log(err);
          });
          const data = { img: fileDir, ...fields };
          callback(err, data);
        }
      });
    });
  }
};
