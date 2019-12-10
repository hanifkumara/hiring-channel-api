const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');


router.post('/signup', controller.signupCompany);
router.post('/login', controller.loginCompany);

module.exports = router