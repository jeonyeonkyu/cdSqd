const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1004',
  database: 'study_db'
});

module.exports = db;