import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { flow } from 'fp-ts/function'
import * as t from 'io-ts'

import { v4 as uuid } from 'uuid'

import { createTodo } from 'src/Domain/Entities/TodoEntity'
import { todoItemToP } from 'src/Domain/DTOs/Persistence/TodoItem'
import {CreateTodoItemInput} from 'src/Domain/DTOs/API/TodoItem'

import TodoRepo from 'src/Domain/Ports/Persistence/TodoRepo';

const createTodoItem = (todoRepo: TodoRepo) => flow(
  CreateTodoItemInput.decode,
  E.orElse(_ => E.left(`Decode Error`)),
  E.chain(({ name, description }) => createTodo(uuid(), name, O.fromNullable(description))),
  E.map(todoItemToP),
  TE.fromEither,
  TE.chain(todoRepo.saveTodo)
)

export default createTodoItem