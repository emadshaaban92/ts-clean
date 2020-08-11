import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { flow } from 'fp-ts/function';
import * as t from 'io-ts'

import { TodoItem, createTodo } from 'src/Domain/Entities/TodoEntity';


const TodoItemP = t.exact(t.type({
  _id: t.string,
  name: t.string,
  description: t.union([t.string, t.undefined])
}))

export type TodoItemP = t.TypeOf<typeof TodoItemP>


export const todoItemToP = ({ id, name, description }: TodoItem): TodoItemP => ({
  _id: id,
  name,
  description: O.toUndefined(description)
})

export const todoItemFromP =
  flow(
    TodoItemP.decode,
    E.orElse(_ => E.left(`Decode Error`)),
    E.chain(({ _id, name, description }) => createTodo(_id, name, O.fromNullable(description)))
  )