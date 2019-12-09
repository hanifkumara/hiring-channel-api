const dotenv = require('dotenv').config();

if(dotenv.error) throw dotenv.error;

const express = require('express');
const bodyParser = require('body-parser');
const routerNav = require('./src');
const lib = require('./src/lib');

const log = console.log;
const port = process.env.PORT || 3000;

const app = express();
app.listen(port, () => log('Server is running on http://localhost:' + port));

app.use(lib.cors);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/', routerNav);
app.get('*', (req, res) => res.send('404 Page Not Found'));
