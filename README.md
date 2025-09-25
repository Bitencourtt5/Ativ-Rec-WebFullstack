## Ativ-Rec-WebFullstack
Projeto feito para a atividade de recuperação da matéria de Des. Web Fullstack a pedido do professor Chico.
A proposta da atividade é fazer uma to-do list com as exigências do professor. Uma delas é ter um CRUD funcional para manipulação de métodos GET, POST, PUT e DELETE em uma memória interna.
## Como utilizar o projeto?
Para rodar o servidor e testar os métodos CRUD  no Postman, é necessário fazer a instalação do Node no projeto. Os comando a seguir devem ser feitos no terminal (ctrl+"):
- Para entrar na pasta "tarefas-api" (criada com mkdir): cd tarefas-api
- Após acessa a pasta do projeto, rodar:
  npm init -y<br>
  npm install express<br>
  npm install --save-dev nodemon<br>
- A modificação feita no arquivo package.json é para rodar o servidor:
  "scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
   }
- Para rodar o servidor, inserir no terminal o comando:
  npm run dev

