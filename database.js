const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'clairvolex_db',
  password: 'ultram@N1996'
});

module.exports = pool;
