const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../auth');

router.post('/login', controller.userLogin);
router.post('/companies/signup', controller.userSignUp);
router.post('/engineers/signup', controller.userSignUp);

auth.setLevel(1, 'user');
router.put('/', auth.checkToken);
router.put('/', controller.update);

router.get('/messages', auth.checkToken);
router.get('/messages', controller.getMsg);

router.post('/messages', auth.checkToken);
router.post('/messages', controller.sendMsg);


module.exports = router