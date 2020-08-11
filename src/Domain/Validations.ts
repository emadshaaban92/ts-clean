import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

export const minLength = (n: number) => (s: string): E.Either<string, string> =>
  s.length >= n ? E.right(s) : E.left(`should have at least ${n} characters`)

export const maxLength = (n: number) => (s: string): E.Either<string, string> =>
  s.length <= n ? E.right(s) : E.left(`shouldn't exceed ${n} characters`)

export const startsWithCapital = (s: string): E.Either<string, string> =>
  /^[A-Z]/g.test(s) ? E.right(s) : E.left('should start with a capital letter')

export const hasOneCapital = (s: string): E.Either<string, string> =>
  /[A-Z]/g.test(s) ? E.right(s) : E.left('should have at least one capital letter')

export const hasOneNumber = (s: string): E.Either<string, string> =>
  /[0-9]/g.test(s) ? E.right(s) : E.left('should have at least one number')


export function validateOptional<A>(validatior: (_: A) => E.Either<string, A>) {
  return O.fold(
    () => E.right(O.none),
    (v: A) => E.map<A, O.Option<A>>(O.some)(validatior(v))
  )
}