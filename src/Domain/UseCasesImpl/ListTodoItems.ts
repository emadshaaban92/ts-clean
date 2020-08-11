import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';
import { flow } from 'fp-ts/function';

import { todoItemToAPI, TodoItemAPI } from 'src/Domain/DTOs/API/TodoItem';
import { todoItemFromP } from 'src/Domain/DTOs/Persistence/TodoItem';

import TodoRepo from '../Ports/Persistence/TodoRepo'


const listTodoItems = (todoRepo: TodoRepo) => flow(
  todoRepo.listTodos,
  TE.chain(A.traverse(TE.taskEither)(flow(
    todoItemFromP,
    E.map(todoItemToAPI),
    TE.fromEither
  )))
)

// Bad
// const listTodoItems = (todoRepo: TodoRepo) => flow(
//   todoRepo.listTodos,
//   TE.chain((todos) : TE.TaskEither<string, TodoItemAPI[]> => {
//     const result: TodoItemAPI[] = [];
//     for (const t of todos){
//       const todo = todoItemFromP(t);
//       if(E.isLeft(todo)){
//         return TE.fromEither(todo);
//       } else {
//         result.push(todoItemToAPI(todo.right))
//       }
//     }
//     return TE.right(result);
//   })
// )

// Better but slow
// const listTodoItems = (todoRepo: TodoRepo) => flow(
//   todoRepo.listTodos,
//   TE.chain(flow(
//     A.map(todoItemFromP),
//     A.map(E.map(todoItemToAPI)),
//     A.map(TE.fromEither),
//     A.sequence(TE.taskEither)
//   ))
// )

// Better but still slow
// const listTodoItems = (todoRepo: TodoRepo) => flow(
//   todoRepo.listTodos,
//   TE.map(A.map(flow(
//     todoItemFromP,
//     E.map(todoItemToAPI),
//     TE.fromEither
//   ))),
//   TE.chain(A.sequence(TE.taskEither))
// )


export default listTodoItems