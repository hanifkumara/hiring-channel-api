const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineers');

router.get('/', controller.getEngineers);
router.post('/', controller.addEngineer);
router.put('/', controller.updateEngineer);
router.delete('/', controller.deleteEngineer);

module.exports = router