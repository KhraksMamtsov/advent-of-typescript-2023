import { test, expectTypeOf } from 'vitest'
import type { WhoWins } from './solution'

type YouWon = 'win'
type YouLost = 'lose'
type Draw = 'draw'
type Rock = '👊🏻'
type Paper = '🖐🏾'
type Scissors = '✌🏽'

test('day-17', () => {
  // '👊🏻', '🖐🏾'
  expectTypeOf<WhoWins<Rock, Paper>>().toEqualTypeOf<YouWon>()

  // '👊🏻', '✌🏽'
  expectTypeOf<WhoWins<Rock, Scissors>>().toEqualTypeOf<YouLost>()

  // '👊🏻', '👊🏻'
  expectTypeOf<WhoWins<Rock, Rock>>().toEqualTypeOf<Draw>()

  // '🖐🏾', '👊🏻'
  expectTypeOf<WhoWins<Paper, Rock>>().toEqualTypeOf<YouLost>()

  // '🖐🏾', '✌🏽'
  expectTypeOf<WhoWins<Paper, Scissors>>().toEqualTypeOf<YouWon>()

  // '🖐🏾', '🖐🏾'
  expectTypeOf<WhoWins<Paper, Paper>>().toEqualTypeOf<Draw>()

  // '✌🏽', '👊🏻'
  expectTypeOf<WhoWins<Scissors, Rock>>().toEqualTypeOf<YouWon>()

  // '✌🏽', '✌🏽'
  expectTypeOf<WhoWins<Scissors, Scissors>>().toEqualTypeOf<Draw>()

  // '✌🏽', '🖐🏾'
  expectTypeOf<WhoWins<Scissors, Paper>>().toEqualTypeOf<YouLost>()
})
