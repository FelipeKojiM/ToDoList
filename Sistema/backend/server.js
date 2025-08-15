const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/usuarios', userRoutes);

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ mensagem: 'Backend funcionando!' });
});

app.get('/logout', (req, res) => {
  // Dados fictícios para enviar de volta ao frontend
  res.json({ message: "Requisição bem-sucedida!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
