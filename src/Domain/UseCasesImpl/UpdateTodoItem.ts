import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { flow } from 'fp-ts/function'

import TodoRepo from 'src/Domain/Ports/Persistence/TodoRepo';
import { createTodo } from 'src/Domain/Entities/TodoEntity'
import { UpdateTodoItemInput } from 'src/Domain/DTOs/API/TodoItem';
import { todoItemToP } from 'src/Domain/DTOs/Persistence/TodoItem';

const updateTodoItem = (todoRepo: TodoRepo) => flow(
  UpdateTodoItemInput.decode,
  E.orElse(_ => E.left(`Decode Error`)),
  E.chain(({ id, name, description }) => createTodo(id, name, O.fromNullable(description))),
  E.map(todoItemToP),
  TE.fromEither,
  TE.chain(todoRepo.updateTodo)
)

export default updateTodoItem