import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { flow } from 'fp-ts/function'
import { sequenceS } from 'fp-ts/Apply'

import { minLength, maxLength, startsWithCapital, validateOptional } from 'src/Domain/Validations';

export type TodoItem = {
  readonly id: string,
  readonly name: string,
  readonly description: O.Option<string>
}

const validateItemName = flow(
  minLength(6),
  E.chain(maxLength(20)),
  E.chain(startsWithCapital),
  E.orElse(e => E.left(`Name ${e}`))
)

const validateItemDescription = flow(
  minLength(15),
  E.chain(maxLength(200)),
  E.chain(startsWithCapital),
  E.orElse(e => E.left(`Description ${e}`))
)


export const createTodo = (id: string, name: string, description: O.Option<string>): E.Either<string, TodoItem> =>
  sequenceS(E.either)({
    id: E.right(id),
    name: validateItemName(name),
    description: validateOptional(validateItemDescription)(description)
  })
