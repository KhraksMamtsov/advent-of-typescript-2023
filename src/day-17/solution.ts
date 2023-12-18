type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽'

type WinnerFor = {
  '👊🏻': '🖐🏾'
  '🖐🏾': '✌🏽'
  '✌🏽': '👊🏻'
}

export type WhoWins<L extends RockPaperScissors, R extends RockPaperScissors> = L extends R
  ? 'draw'
  : R extends WinnerFor[L]
    ? 'win'
    : 'lose'
