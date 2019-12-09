const dotenv = require('dotenv').config();

if(dotenv.error) throw dotenv.error;

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const log = console.log;
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

routes(app);

app.listen(port, () => log('Server is running on http://localhost:' + port));

// CRUD:done