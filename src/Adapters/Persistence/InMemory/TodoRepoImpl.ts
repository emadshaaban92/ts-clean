import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function'

import TodoRepo from "src/Domain/Ports/Persistence/TodoRepo"
import {TodoItemP} from 'src/Domain/DTOs/Persistence/TodoItem'


const todos = new Map<string, TodoItemP>()

const repo: TodoRepo= {
  saveTodo: todo => pipe(
    todos.set(todo._id, todo),
    () => TE.right(undefined)
    // () => TE.tryCatch(() => Promise.resolve(undefined), () => "Error that will never happen!")
  ),
  updateTodo: flow(
    E.fromPredicate((todo) => todos.has(todo._id), () => 'Todo not found'),
    E.map(todo => todos.set(todo._id, todo)),
    E.map(_ => undefined),
    TE.fromEither
  ),
  getTodoById: flow(
    todos.get.bind(todos),
    O.fromNullable,
    TE.fromOption(() => 'Todo not found')
  ),
  removeTodoById: flow(
    todos.delete.bind(todos),
    isDeleted => isDeleted ? TE.right(undefined) : TE.left('Todo not found')
  ),
  listTodos: flow(
    () => Array.from(todos.values()),
    TE.right
  )
}

export default repo;