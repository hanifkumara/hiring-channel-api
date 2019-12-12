const express = require('express');
const router = express.Router();
const controller = require('../controllers/companies');
const auth = require('../auth');

router.get('/', controller.getCompanies);

auth.setLevel(2, 'admin');
router.post('/', auth.checkToken);
router.put('/', auth.checkToken);
router.delete('/', auth.checkToken);

router.put('/', controller.updateCompany);
router.delete('/', controller.deleteCompany);

module.exports = router