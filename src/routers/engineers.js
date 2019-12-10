const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineers');
const auth = require('../auth');

auth.setLevel('admin');
router.use(auth.checkToken);

router.get('/', controller.getEngineers);
router.post('/', controller.addEngineer);
router.put('/', controller.updateEngineer);
router.delete('/', controller.deleteEngineer);

module.exports = router