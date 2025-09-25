const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// armazenamento em memória
let tasks = [];
let nextId = 1;

// Criar nova tarefa (POST)
app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;
  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ error: 'Campo "titulo" é obrigatório e deve ser string não vazia.' });
  }
  
// Verificação para a existência de um título de tarefa igual na tabela
const exists = tasks.some(t => t.titulo.toLowerCase() === titulo.trim().toLowerCase());
  if (exists) {
    return res.status(409).json({ error: 'Já existe uma tarefa com esse título.' });
  }

  const task = {
    id: nextId++,
    titulo: titulo.trim(),
    descricao: descricao ? String(descricao) : '',
    completo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Faz o SELECT(GET) de todas as tarefas
app.get('/tarefas', (req , res) => {
  res.json(tasks);
});

// Faz o SELECT(GET) separado por id da tarefa
app.get('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  res.json(task);
});

// Atualização de tabela (PUT)
app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  const { titulo, descricao, completo } = req.body;

  if (titulo !== undefined && (typeof titulo !== 'string' || !titulo.trim())) {
    return res.status(400).json({ error: 'Se fornecido, "titulo" não pode estar vazio.' });
  }
  if (completo !== undefined && typeof completo !== 'boolean') {
    return res.status(400).json({ error: '"completo" deve ser booleano.' });
  }

  const task = tasks[idx];
  if (titulo !== undefined) task.titulo = titulo.trim();
  if (descricao !== undefined) task.descricao = String(descricao);
  if (completo !== undefined) task.completo = completo;
  task.updatedAt = new Date().toISOString();

  tasks[idx] = task;
  res.json(task);
});

// Excluir tarefa
app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  tasks.splice(idx, 1);
  res.status(204).end();
});

// erro de json incorreto
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON incorreto.' });
  }
  next();
});

app.listen(PORT, () => console.log(`API de tarefas rodando em http://localhost:${PORT}`));
