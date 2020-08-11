import * as TE from 'fp-ts/TaskEither';

import {TodoItemP} from 'src/Domain/DTOs/Persistence/TodoItem'

interface TodoRepo {
  saveTodo(t: TodoItemP): TE.TaskEither<string, void>
  updateTodo(t: TodoItemP): TE.TaskEither<string, void>
  getTodoById(id: string) : TE.TaskEither<string, TodoItemP>
  removeTodoById(id: string) : TE.TaskEither<string, void>
  listTodos() : TE.TaskEither<string, TodoItemP[]>
}

export default TodoRepo