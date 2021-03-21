// Import Dependency
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const exjwt = require('express-jwt')
const db = require('./cfg/db.js');
const Users = require('./routes/user.js');

// Port Where The App Is Running
const port = process.env.PORT || 1337;

// Declare Express
const app = express()

// Init cors
app.use(cors());

//Enable Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', Users)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})
