import * as O from 'fp-ts/Option';
import * as t from 'io-ts'

import { TodoItem } from 'src/Domain/Entities/TodoEntity';


const TodoItemAPI = t.exact(t.type({
  id: t.string,
  name: t.string,
  description: t.union([t.string, t.undefined])
}))
export type TodoItemAPI = t.TypeOf<typeof TodoItemAPI>


export const todoItemToAPI = ({ id, name, description }: TodoItem): TodoItemAPI => ({
  id,
  name,
  description: O.toUndefined(description)
})

export const CreateTodoItemInput = t.exact(t.type({
  name: t.string,
  description: t.union([t.string, t.undefined])
}))
export type CreateTodoItemInput = t.TypeOf<typeof CreateTodoItemInput>


export const UpdateTodoItemInput = TodoItemAPI;
export type UpdateTodoItemInput = t.TypeOf<typeof UpdateTodoItemInput>


export const DeleteTodoItemInput = t.exact(t.type({
  id: t.string
}))
export type DeleteTodoItemInput = t.TypeOf<typeof DeleteTodoItemInput>


export const FetchTodoItemInput = t.exact(t.type({
  id: t.string
}))
export type FetchTodoItemInput = t.TypeOf<typeof FetchTodoItemInput>