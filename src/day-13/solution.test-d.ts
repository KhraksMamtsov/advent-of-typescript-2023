import { test, expectTypeOf } from 'vitest'
import type { DayCounter } from './solution'

test('day-13', () => {
  expectTypeOf<DayCounter<1, 12>>().toEqualTypeOf<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>()

  expectTypeOf<DayCounter<1, 12>>().toEqualTypeOf<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>()

  expectTypeOf<DayCounter<1, 25>>().toEqualTypeOf<
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
  >()

  expectTypeOf<DayCounter<1, 25>>().toEqualTypeOf<
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
  >()
})
