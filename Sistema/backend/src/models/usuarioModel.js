const pool = require('../config/db'); // ajusta o caminho do seu pool

const UsuarioModel = {

  listAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuarios';
      pool.query(query, (err, results) => {
        if (err) return reject(new Error('Erro ao listar usuários'));
        resolve(results);
      });
    });
  },

  buscarPorId: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuarios WHERE id_usuarios = ?';
      pool.query(query, [id], (err, results) => {
        if (err) return reject(new Error('Erro ao buscar usuário'));
        resolve(results[0]);
      });
    });
  },

  // Criar usuário
  criar: ({ adm_usuarios, nome_usuarios, senha_usuarios, login_usuarios }) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO usuarios (adm_usuarios, nome_usuarios, senha_usuarios, login_usuarios) VALUES (?, ?, ?, ?)';
      pool.query(query, [adm_usuarios, nome_usuarios, senha_usuarios, login_usuarios], (err, results) => {
        if (err) return reject(new Error('Erro ao criar usuário'));
        resolve({ id: results.insertId, adm_usuarios, nome_usuarios, login_usuarios });
      });
    });
  },
};

module.exports = UsuarioModel;
