const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ mensagem: 'Backend funcionando!' });
});

app.get('/logout', (req, res) => {
  // Dados fictícios para enviar de volta ao frontend
  res.json({ message: "Requisição bem-sucedida!" });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM usuarios WHERE login_usuarios = ? AND senha_usuarios = ?';

  pool.query(query, [email, senha], (err, results) => {
      if(err) return res.status(500).json({erro: 'Falha na Requisição! Contate o suporte técnico.'});
      if(results.length > 0){
        res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: results[0] });
      }else{
        return res.status(401).json({erro: 'Credenciais inválidas!'});
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
