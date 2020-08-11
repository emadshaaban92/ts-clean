import * as TE from 'fp-ts/TaskEither';

import PersistencePort from './Persistence';

import {
  TodoItemAPI, 
  CreateTodoItemInput,
  UpdateTodoItemInput,
  DeleteTodoItemInput,
  FetchTodoItemInput
} from 'src/Domain/DTOs/API/TodoItem'


interface UseCasesPort {
  createTodoItem: (todoRepo: PersistencePort["todoRepo"]) => (input: CreateTodoItemInput) => TE.TaskEither<string, void>
  updateTodoItem: (todoRepo: PersistencePort["todoRepo"]) => (input: UpdateTodoItemInput) => TE.TaskEither<string, void>
  deleteTodoItem: (todoRepo: PersistencePort["todoRepo"]) => (input: DeleteTodoItemInput) => TE.TaskEither<string, void>
  fetchTodoItem: (todoRepo: PersistencePort["todoRepo"]) => (input: FetchTodoItemInput) => TE.TaskEither<string, TodoItemAPI>
  listTodoItems: (todoRepo: PersistencePort["todoRepo"]) => () => TE.TaskEither<string, TodoItemAPI[]>
}

export default UseCasesPort