import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { flow } from 'fp-ts/function';

import {DeleteTodoItemInput} from 'src/Domain/DTOs/API/TodoItem'
import TodoRepo from 'src/Domain/Ports/Persistence/TodoRepo'


const deleteTodoItem = (todoRepo: TodoRepo) => flow(
  DeleteTodoItemInput.decode,
  E.orElse(_ => E.left(`Decode Error`)),
  E.map(({id}) => id),
  TE.fromEither,
  TE.chain(todoRepo.removeTodoById)
)

export default deleteTodoItem