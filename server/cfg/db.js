// Import Dependency
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Init Connection To Database
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'report'
})

// Connection To Database
db.connect((err) => {
  if (err) throw err
  console.log("Database Connected");
})

// Export Module To Use On Server.js
 module.exports = db;
