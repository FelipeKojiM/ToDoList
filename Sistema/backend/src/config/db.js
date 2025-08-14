const mysql = require('mysql2'); // ← importa a lib mysql2

const pool = mysql.createPool({
  host: 'localhost',
  user: 'abacaxi',
  password: 'Eucomoabacaxi1?',
  database: 'todolist',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
