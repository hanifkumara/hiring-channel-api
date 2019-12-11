const jwt = require('jsonwebtoken');
const response = require('./lib/responses');

const user = {
    level: 0,
    role: 'user'
}

module.exports = {
    setLevel: (level, role) => {
        user.level = level;
        user.role = role;
    },
    checkToken: (req, res, next) => {
        const {token} = req.query;
        jwt.verify(token, process.env.AUTH_SECRET, (err, decode) => {
            if(err || (decode.level < user.level && decode.role != user.role)) response.err(res, err, 'Invalid token');
            else next();
        });
    }
}