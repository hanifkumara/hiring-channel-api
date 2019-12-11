const express = require('express');
const router = express.Router();
const controller = require('../controllers/companies');
const auth = require('../auth');

router.post('/signup', controller.userSignUp);
router.get('/', controller.getCompanies);

auth.setLevel(2, 'admin');
router.use(auth.checkToken);

router.post('/', controller.addCompany);
router.put('/', controller.updateCompany);
router.delete('/', controller.deleteCompany);

module.exports = router