const mysql = require('mysql2');
const pool = require('./src/config/db'); // ajuste o caminho

// faz uma query simples pra testar
pool.query('SELECT * FROM usuarios', (err, rows) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
    return;
  }

  console.log('✅ Conexão OK! Resultado:');
  console.log(rows); // rows é um array de objetos com todos os usuários
  process.exit(); // encerra o script
});
