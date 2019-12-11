const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineers');
const auth = require('../auth');

router.post('/signup', controller.userSignUp);
router.get('/', controller.getEngineers);

auth.setLevel(2, 'admin');
router.use(auth.checkToken);

router.post('/', controller.addEngineer);
router.put('/', controller.updateEngineer);
router.delete('/', controller.deleteEngineer);

module.exports = router