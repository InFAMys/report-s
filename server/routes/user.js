// Import Dependency
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt')
const bcrypt = require('bcryptjs');
const db = require('../cfg/db.js');
const users = express.Router();

//Enable Body Parser
users.use(bodyParser.json())
users.use(bodyParser.urlencoded({
  extended: true
}))

//initiate secretkey used by JWT
const userKey = "EA4D02BE0C3FCC2F953AB65E628459FC811DC398E3B52FA79F46F06A90CA80BD"

users.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome To Report-S'
  })
})

users.post('/register', async (req, res) => {
  try {
    let data = req.body;
    let password = data.password;
    const hash = await bcrypt.hash(password, 10)
    let sql = `
          insert into user (nik, name, username, password, telp)
          values ('` + data.nik + `', '` + data.name + `', '` + data.username + `', '` + hash + `', '` + data.telp + `');
      `
    db.query(sql, (err, res) => {
      if (err) throw err
    })
  } catch (e) {
    console.log(e);
    res.status(500).send('Something Broken!')
  }
  res.json({
    success: true,
    message: 'Your Account Succesfully Registered!'
  })
})

users.post('/login', async (req, res) => {
  try {
    let data = req.body
    let username = data.username;
    let password = data.password;
    let ver = 'SELECT * FROM user WHERE username = ?';

    await db.query(ver, [username], (err, db) => {
      bcrypt.compare(data.password, db[0].password, (err, validate) => {
        if (err) throw err
        else if (validate == true) {
          let token = jwt.sign(data.username + '|' + data.password, userKey)
          res.json({
            success: true,
            message: 'Logged In!',
          });
        } else {
          res.json({
            success: false,
            message: 'Invalid Credential!',
          });
        }
      })
    })
  } catch (e) {
    console.log(e);
    res.status(500).send('Something Broken!')
  }
})

users.use(exjwt({
  secret: userKey,
  algorithms: ['HS256']
}));

module.exports = users
