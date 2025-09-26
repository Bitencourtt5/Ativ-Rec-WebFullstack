const express = require('express');
const tarefasRouter = require('./src/tarefas');
const jsonErrorHandler = require('./src/jsonErrorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());           
app.use(jsonErrorHandler);         

// monta as rotas
app.use('/tarefas', tarefasRouter);

// erro caso não encontre a rota
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// erro de servidor
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => console.log(`API de tarefas rodando em http://localhost:${PORT}`));
