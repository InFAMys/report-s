// Import Dependency
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt')
const db = require('../cfg/db.js');
const users = express.Router();

//Enable Body Parser
users.use(bodyParser.json())
users.use(bodyParser.urlencoded({
  extended: true
}))

//initiate secretkey used by JWT
const userKey = "EA4D02BE0C3FCC2F953AB65E628459FC811DC398E3B52FA79F46F06A90CA80BD"
const optKey = "E9240D1A0ABFE2C414601944BB7CD84636166FFB2B6E77C3978284017190FD61"
const adminKey = "A5A1CE4A198CAF7684EB951AC3B11B9BE8431AB43649D173D9F6AC174ED89501"

users.get('/', (request, result) => {
    result.json({
        success: true,
        message: 'Welcome To Report-S'
    })
})

users.post('/register', (request, result) => {
    let data = request.body

    let sql = `
        insert into user (nik, name, username, password, telp)
        values ('`+data.nik+`', '`+data.name+`', '`+data.username+`', '`+data.password+`', '`+data.telp+`');
    `

    db.query(sql, (err, result) => {
        if (err) throw err
    })

    result.json({
        success: true,
        message: 'Your Account Succesfully Registered!'
    })
})

users.post('/login', function(request, result) {
  let data = request.body
	var username = data.username;
	var password = data.password;
	if (username && password) {
		db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
        let token = jwt.sign(data.username + '|' +data.password, userKey)
        result.json({
          success: true,
          message: 'Logged In!',
        });
        console.log(token);
			} else {
				result.json({
          success: false,
          message: 'Invalid Credential!',
        });
			}
			result.end();
		});
	}
});
users.use(exjwt({ secret: userKey, algorithms: ['HS256'] }));

module.exports =  users
