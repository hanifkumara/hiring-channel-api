const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../auth');

// auth.level = 'user';
// router.use(auth.checkToken);
router.post('/login', controller.userLogin);

module.exports = router