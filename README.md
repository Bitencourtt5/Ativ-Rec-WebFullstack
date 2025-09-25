# Ativ-Rec-WebFullstack
Projeto feito para a atividade de recuperação da matéria de Des. Web Fullstack a pedido do professor Chico.
A proposta da atividade é fazer uma to-do list com as exigências do professor. Uma delas é ter um CRUD funcional para manipulação de métodos GET, POST, PUT e DELETE em uma memória interna.
## Como utilizar o projeto?
Para rodar o servidor e testar os métodos CRUD  no Postman, é necessário fazer a instalação do Node no projeto. Os comando a seguir devem ser feitos no terminal (ctrl+"):
- Para entrar na pasta "tarefas-api" (criada com mkdir):<br> cd tarefas-api
- Após acessa a pasta do projeto, rodar:<br>
  npm init -y<br>
  npm install express<br>
  npm install --save-dev nodemon<br>
- A modificação feita no arquivo package.json é para rodar o servidor:<br>
  "scripts": {<br>
  "start": "node server.js",<br>
  "dev": "nodemon server.js"<br>
   }
- Para rodar o servidor, inserir no terminal o comando:<br>
  npm run dev<br>
- No Postman, na aba "body" selecionar a opção RAW e JSON
### Rotas disponíveis na API
- Método POST:<br>
  Rota -> http://localhost:3000<br>
  Exemplo de inserção de dados:<br>
  "titulo": "Prova NI",<br>
  "descricao": "Estudar HTML/CSS"<br>
  No código, fiz uma verificação para não ser possível inserir tarefas com títulos iguais que retorna a mensagem "Já existe uma tarefa com esse título.", caso aconteça.
- Método GET: <br>
  Rota -> http://localhost:3000/tarefas<br>
  Retorna a tabela com todas as tarefas registradas<br>
  Para fazer a busca de apenas uma única tarefa: <br>
  Rota -> http://localhost:3000/tarefas/:id<br>
  Retorna somente a tarefa do ID selecionado
- Método PUT:<br>
  Rota -> http://localhost:3000/tarefas/:id<br>
  Para o método PUT, criei uma rota para atualizar a situação da tarefa para concluída ou não com o comando:<br>
  "completo": true -> para tarefa concluída<br>
  "completo": false -> para tarefa não concluída
- Método DELETE: <br>
  Rota -> http://localhost:3000/tarefas/:id<br>
  Fazendo o DELETE nessa rota, apaga a tarefa de ID selecionado na rota.

## Prints do Postman:
Todos os prints dos métodos estão localizados na pasta "prints", da forma que foi solicitada!
  
