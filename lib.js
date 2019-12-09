const formidable = require('formidable');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const log = console.log;

module.exports = {
    sqlCheck: err => console.log(err || 'Affected rows: 0'),
    date: () => {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    },
    pagination: (data, page, show = 5) => {
        const start = show * (page - 1);
        const end = (show * page > data.length) ? data.length : show * page;
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

        form.parse(req, (err, fields, files) => {
            const data = {img: 'blank-img.jpg', ...fields};

            if(err) {
                callback(data);
                return;
            }
            const oldPath = files.img.path;
            const newPath = `public/assets/img/${uuidv4() + '_' + files.img.name}`;

            fs.copyFile(oldPath, newPath, err => {
                if(err) {
                    callback(data);
                } else {
                    fs.unlink(oldPath, err => {
                        if(err) log(err);
                    });
                    data.img = newPath;
                    callback(data);
                }
            });
        });
    }
}

// Notes
// - Engineer showcase > img (easy query)