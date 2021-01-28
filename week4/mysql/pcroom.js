const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1004',
  database: 'study_db'
});

connection.connect();

connection.query('SELECT * from PCSEAT', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});


connection.end();