// Pagination
// const start = 5 * (page - 1);
// const end = (5 * page > result.length) ? result.length : 5 * page;
// log(start);
// if (start > result.length) {
//     response.ok(res, []);
// } else {
//     const data = [];
//     for (let i = start; i < end; i++) {
//         data.push(result[i]);
//     }
//     response.ok(res, data);
// }


// form.parse(req, (err, fields, files) => {
//     const data = {...fields};
//     if(files.img == undefined) {
//         data.showcase = 'blank-img.jpg';
//     }else {
//         data.img = 'blank-img.jpg';
//     }

//     if(err) {
//         callback(data);
//         return;
//     }
//     log(files);
//     const path = (files.img == undefined) ? files.showcase.path : files.img.path;
//     const oldPath = path
//     const newPath = `public/assets/img/${uuidv4() + '_' + path}`;

//     fs.copyFile(oldPath, newPath, err => {
//         if(err) {
//             callback(data);
//         } else {
//             fs.unlink(oldPath, err => {
//                 if(err) log(err);
//             });

//             if(files.img == undefined) {
//                 data.showcase = newPath;
//             }else {
//                 data.img = newPath;
//             }
//             callback(data);
//         }
//     });
// });

// models.addCompany(data.company)
//     .then(result => {
//         bcrypt.hash(data.user.password, saltRounds).then(hash => {
//             data.user.password = hash;
//             models.regisCompany(data.user)
//                 .then(result => response.ok(res, data, 'Register success', 201))
//                 .catch(err => {
//                     models.deleteCompany(id)
//                         .then(() => response.err(res, err, 'Ops, register failed'))
//                         .catch(err => response.err(res, err, 'Ops, register failed'))
//                 });
//         });
//     })
//     .catch(err => response.err(res, err, err.message));

// const jwt = require('jsonwebtoken');

// jwt.sign({name: 'uut'}, 'secret', {expiresIn: process.env.AUTH_EXPIRES}, (err, token) => {
//     console.log(token);
//     jwt.verify('aw', 'secret', (err, decode) => console.log(err || decode));
// });

// if(data.user.role == 'company') {
//     data.company = {
//         id,
//         name: fields.name,
//         img: fields.img,
//         location: fields.location,
//         description: fields.description,
//     };
//     models.addCompany(data.company)
//         .then(result => response.ok(res, data, 'Register successfully', 201))
//         .catch(err => {
//             models.deleteUser(id)
//                 .then(() => response.err(res, err, 'Ops, register failed'))
//                 .catch(err => response.err(res, err, 'Ops, register failed'))
//         });
// } else {
//     data.engineer = {
//         id,
//         name: fields.name,
//         img: fields.img,
//         location: fields.location,
//         description: fields.description,
//         skills: fields.skills,
//         birthdate: fields.birthdate,
//         created: lib.date(),
//         updated: lib.date(),
//     };
//     models.addEngineers(data.engineer)
//         .then(result => response.ok(res, data, 'Register successfully', 201))
//         .catch(err => {
//             models.deleteUser(id)
//                 .then(() => response.err(res, err, 'Ops, register failed'))
//                 .catch(err => response.err(res, err, 'Ops, register failed'))
//         });
// }