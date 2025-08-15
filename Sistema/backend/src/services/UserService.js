const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const UsuarioService = {

  // LISTAR todos
  listarTodos: async () => {
    return await UsuarioModel.listarTodos();
  },

  // CRIAR usuário
  criar: async ({ adm_usuarios, nome_usuarios, senha_usuarios, login_usuarios }) => {
    // validações básicas
    if (!nome_usuarios || !senha_usuarios || !login_usuarios) {
      throw new Error('Todos os campos são obrigatórios!');
    }

    // criptografar a senha
    const hash = await bcrypt.hash(senha_usuarios, 10);
    return await UsuarioModel.criar({ adm_usuarios, nome_usuarios, senha_usuarios: hash, login_usuarios });
  },

  // LOGIN
  login: async ({ login_usuarios, senha_usuarios }) => {
    // busca usuário pelo email
    const usuario = await UsuarioModel.listAll().then(users => users.find(u => u.login_usuarios === login_usuarios));
    
    if (!usuario) {
      const error = new Error('Login inválido!');
      error.status = 401;
      throw error;
    }

    // compara senha
    const match = await bcrypt.compare(senha_usuarios, usuario.senha_usuarios);
    if (!match) {
      const error = new Error('Senha inválida!');
      error.status = 401;
      throw error;
    }

    // retorna usuário sem a senha
    const { senha, ...rest } = usuario;
    return rest;
  },
};

module.exports = UsuarioService;
