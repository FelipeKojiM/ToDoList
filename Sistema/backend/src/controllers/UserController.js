const UsuarioService = require('../services/UserService');

const UsuarioController = {

  // LISTAR todos
  listar: async (req, res) => {
    try {
      const usuarios = await UsuarioService.listarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // CRIAR usuário
  createUser: async (req, res) => {
    try {
      const novoUsuario = await UsuarioService.criar(req.body);
      res.status(201).json(novoUsuario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // LOGIN
  userLogin: async (req, res) => {
    try {
      const usuario = await UsuarioService.login(req.body);
      res.json(usuario);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },
};

module.exports = UsuarioController;
