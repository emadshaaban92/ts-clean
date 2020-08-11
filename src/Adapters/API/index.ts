import express from "express";
import bodyParser from 'body-parser';
import * as E from 'fp-ts/Either';

import UseCasesPort from 'src/Domain/Ports/UseCases';
import PersistencePort from 'src/Domain/Ports/Persistence';


export default (useCases: UseCasesPort, persistence: PersistencePort) => {
  const app = express();
  app.use(bodyParser.json())
  const port = 8080; 

  app.get("/", (req, res) => {
    res.json({ test: "test" })
  });

  app.get('/todos', (req, res) => {
    useCases.listTodoItems(persistence.todoRepo)(undefined)().then(E.fold(
      e => res.json({
        error: e
      }),
      res.json.bind(res)
    ));
  })

  app.post('/todos/create', (req, res) => {
    useCases.createTodoItem(persistence.todoRepo)(req.body)().then(E.fold(
      e => res.json({
        error: e
      }),
      res.json.bind(res)
    ));
  })

  app.put('/todos/:id', (req, res) => {
    useCases.updateTodoItem(persistence.todoRepo)({
      ...req.body,
      id: req.params.id
    })().then(E.fold(
      e => res.json({
        error: e
      }),
      res.json.bind(res)
    ));
  })

  app.delete('/todos/:id', (req, res) => {
    useCases.deleteTodoItem(persistence.todoRepo)({
      id: req.params.id
    })().then(E.fold(
      e => res.json({
        error: e
      }),
      res.json.bind(res)
    ));
  })

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}

