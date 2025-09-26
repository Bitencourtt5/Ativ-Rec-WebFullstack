let tasks = [];
let nextId = 1;

function validateTitulo(titulo) {
  return typeof titulo === 'string' && titulo.trim().length > 0;
}

function findByTitulo(titulo) {
  if (!titulo) return undefined;
  return tasks.find(t => t.titulo.toLowerCase() === titulo.trim().toLowerCase());
}

exports.createTask = (req, res) => {
  const { titulo, descricao } = req.body;
  if (!validateTitulo(titulo)) {
    return res.status(400).json({ error: 'Campo "titulo" é obrigatório e deve ser string não vazia.' });
  }

  // erro para o caso de repetição de título
  if (findByTitulo(titulo)) {
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
  return res.status(201).json(task);
};

exports.listTasks = (req, res) => {
  return res.json(tasks);
};
//erro para caso não encontre a tarefa
exports.getTask = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.json(task);
};

exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  const { titulo, descricao, completo } = req.body;

  if (titulo !== undefined && !validateTitulo(titulo)) {
    return res.status(400).json({ error: 'Se fornecido, "titulo" não pode estar vazio.' });
  }
  if (completo !== undefined && typeof completo !== 'boolean') {
    return res.status(400).json({ error: '"completo" deve ser true ou false.' });
  }

  // Se mudou o título, checar se existem outras tarefas com o mesmo título
  if (titulo !== undefined) {
    const other = tasks.find(t => t.id !== id && t.titulo.toLowerCase() === titulo.trim().toLowerCase());
    if (other) {
      return res.status(409).json({ error: 'Outro registro já usa esse título.' });
    }
  }

  const task = tasks[taskIndex];
  if (titulo !== undefined) task.titulo = titulo.trim();
  if (descricao !== undefined) task.descricao = String(descricao);
  if (completo !== undefined) task.completo = completo;
  task.updatedAt = new Date().toISOString();

  tasks[taskIndex] = task;
  return res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  tasks.splice(idx, 1);
  return res.status(204).end();
};
