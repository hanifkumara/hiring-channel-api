const express = require('express');
const router = express.Router();

const companies = require('./routers/companies');
const engineers = require('./routers/engineers');

const api = '/api/v1/';

router.use(api + 'companies', companies);
router.use(api + 'engineers', engineers);

module.exports = router;