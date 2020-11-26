const express = require("express");
const cors = require("cors");

// Responsével por criar um id único para cada repositório.
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());

app.use(cors());

const repositories = [];

// Lista todos os repositórios existentes.
app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

// Cria um repositório.
app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const likes = 0;

  const repositorie = { id: uuid(), title, url, techs, likes };

  repositories.push(repositorie);

  return response.json(repositorie);

});

// Atualiza o título, a url e as tecnologias de um repositório.
app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const { title, url, techs } = request.body;

  // Procura o repositorio com o id passado.
  const repositorieIndex = repositories.findIndex(

    repositorie => repositorie.id == id

  );

  // Se o repositório não for encontrada repositorieIndex é -1.
  if(repositorieIndex < 0) {

    // Retorna um erro 400 (bad request) para o usuário.
    return response.status(400).json({ error: "Repositorie not found!"});

  }
  
  const likes = repositories[repositorieIndex].likes;

  const repositorie = {

    id,
    title,
    url,
    techs,
    likes

  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);

});

// Apaga um repositório.
app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  // Procura o repositorio com o id passado.
  const repositorieIndex = repositories.findIndex(

    repositorie => repositorie.id == id

  );

   // Se o repositório não for encontrada repositorieIndex é -1.
   if(repositorieIndex < 0) {

    // Retorna um erro 400 (bad request) para o usuário.
    return response.status(400).json({ error: "Repositorie not found!"});

  }

  // Apaga o repositório encontrado.
  repositories.splice([repositorieIndex], 1);

  return response.status(204).json(repositories);
  
});

// Atualiza os likes de um repositório.
app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(

    repositorie => repositorie.id == id

  );

  if(repositorieIndex < 0) {

    return response.status(400).json({ error: "Repositorie not found!" });

  }

  repositories[repositorieIndex].likes += 1;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
