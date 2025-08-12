const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Usuários fictícios
const usuarios = [
  { id: 1, email: 'admin', senha: '123', tipo: 'admin' },
  { id: 2, email: 'user', senha: '123', tipo: 'usuario' }
];

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ mensagem: 'Backend funcionando!' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  // Token fake só para teste
  const token = `${usuario.tipo}-token-${Date.now()}`;

  res.json({
    mensagem: 'Login bem-sucedido',
    token,
    tipo: usuario.tipo
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
