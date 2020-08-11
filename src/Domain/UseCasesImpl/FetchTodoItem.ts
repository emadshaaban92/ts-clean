import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { flow } from 'fp-ts/function';

import {todoItemToAPI, FetchTodoItemInput} from 'src/Domain/DTOs/API/TodoItem';
import { todoItemFromP } from 'src/Domain/DTOs/Persistence/TodoItem';

import TodoRepo from 'src/Domain/Ports/Persistence/TodoRepo'

const fetchTodoItem = (todoRepo: TodoRepo) => flow(
  FetchTodoItemInput.decode,
  E.orElse(_ => E.left(`Decode Error`)),
  E.map(({id}) => id),
  TE.fromEither,
  TE.chain(todoRepo.getTodoById),
  TE.chain(flow(todoItemFromP, TE.fromEither)),
  TE.map(todoItemToAPI),
)

export default fetchTodoItem