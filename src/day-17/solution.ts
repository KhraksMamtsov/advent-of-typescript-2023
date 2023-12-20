export type Rock = "👊🏻";
export type Paper = "🖐🏾";
export type Scissors = "✌🏽";

type RockPaperScissors = Rock | Paper | Scissors;

export type YouWon = "win";
export type YouLost = "lose";
export type Draw = "draw";

type WinerFor = {
  "👊🏻": "🖐🏾";
  "🖐🏾": "✌🏽";
  "✌🏽": "👊🏻";
};

export type WhoWins<
  L extends RockPaperScissors,
  R extends RockPaperScissors,
> = L extends R ? "draw" : R extends WinerFor[L] ? "win" : "lose";
