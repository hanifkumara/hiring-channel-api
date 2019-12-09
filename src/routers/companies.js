const express = require('express');
const router = express.Router();
const controller = require('../controllers/companies');

router.get('/', controller.getCompanies);
router.post('/', controller.addCompany);
router.put('/', controller.updateCompany);
router.delete('/', controller.deleteCompany);

module.exports = router