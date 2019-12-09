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