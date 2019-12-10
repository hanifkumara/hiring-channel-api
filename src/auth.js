const jwt = require('jsonwebtoken');
const response = require('./lib/responses');

let level = undefined;

module.exports = {
    setLevel: role => level = role,
    checkToken: (req, res, next) => {
        const {token} = req.query;
        jwt.verify(token, process.env.AUTH_SECRET, (err, decode) => {
            if(err || decode.level != level) response.err(res, err, 'Invalid token');
            else next();
        });
    }
}