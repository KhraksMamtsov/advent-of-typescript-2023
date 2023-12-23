type Chips = "🔴" | "🟡";
type Empty = "  ";
type Cell = Chips | Empty;
type State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];
type BoardRowLike = Array<Cell>;
type BoardLike = Array<BoardRowLike>;

type BoardRow = [Cell, Cell, Cell, Cell, Cell, Cell, Cell];
type Board = [
  //
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
];

export type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type GameState = {
  board: Board;
  state: State;
};

type SetChipInRow<
  BRL extends BoardRowLike,
  I extends number,
  Chip extends Chips,
  R extends BoardRowLike = [],
> = BRL extends [
  //
  infer Head extends Cell,
  ...infer Tail extends BoardRowLike,
]
  ? SetChipInRow<Tail, I, Chip, [...R, R["length"] extends I ? Chip : Head]>
  : R;

type NextChip = {
  "🟡": "🔴";
  "🔴": "🟡";
};

type WinnerForState = {
  "🟡": "🟡 Won";
  "🔴": "🔴 Won";
};

type SetChipOnBoard<
  BL extends BoardLike,
  Chip extends Chips,
  I extends number,
  R extends BoardLike = [],
  Setted extends boolean = false,
> = BL extends [
  //
  ...infer Top extends BoardLike,
  infer BottomRow extends BoardRow,
]
  ? SetChipOnBoard<
      Top,
      Chip,
      I,
      [
        [BottomRow[I], Setted] extends [Empty, false]
          ? SetChipInRow<BottomRow, I, Chip>
          : BottomRow,
        ...R,
      ],
      BottomRow[I] extends Empty ? true : false
    >
  : R;

type GetColumn<BL extends BoardLike, I extends number> = {
  [K in keyof BL]: `${BL[K][I]}${K}`;
};

type CheckWinInDirectionFor<
  BRL extends BoardRowLike,
  C extends Chips,
  R extends Array<Cell> = [],
  L extends number = 0,
> = BRL extends [infer H extends Cell, ...infer T extends BoardRowLike] //
  ? CheckWinInDirectionFor<
      T,
      C,
      [C] extends [H] ? [...R, H] : [],
      L | ([C] extends [H] ? [...R, H]["length"] : 0)
    >
  : 4 extends L
    ? true
    : false;

type CheckDirectionWinFor<
  B extends BoardLike,
  C extends Chips,
> = boolean extends {
  [K in keyof B & `${number}`]: CheckWinInDirectionFor<B[K], C>;
}[keyof B & `${number}`]
  ? true
  : false;

type GetDiagonal<
  //
  A extends unknown[][],
  I extends 0[] = [],
  R extends unknown[] = [],
> = A extends [infer H extends unknown[], ...infer T extends unknown[][]]
  ? GetDiagonal<
      T,
      [...I, 0],
      H[I["length"]] extends undefined ? R : [...R, H[I["length"]]]
    >
  : R;
type GetRevDiagonal<
  //
  A extends unknown[][],
  I extends 0[] = [],
  R extends unknown[] = [],
> = A extends [...infer T extends unknown[][], infer H extends unknown[]]
  ? GetRevDiagonal<
      T,
      [...I, 0],
      H[I["length"]] extends undefined ? R : [...R, H[I["length"]]]
    >
  : R;

type GetDiagonals<
  //
  A extends unknown[][],
  I extends 0[] = [],
  R extends unknown[][] = [],
> = I["length"] extends A[number]["length"]
  ? R
  : GetDiagonals<
      A,
      [...I, 0],
      [
        ...R,
        GetDiagonal<A, I>,
        GetDiagonal<Skip<A, I>, []>,
        GetRevDiagonal<A, I>,
        GetRevDiagonal<Skip<A, I>, []>,
      ]
    >;

type Skip<T extends unknown[][], I extends 0[]> = I extends [
  infer _,
  ...infer ITail extends 0[],
]
  ? T extends [infer _, ...infer Tail extends unknown[][]]
    ? Skip<Tail, ITail>
    : T
  : T;

type SetState<
  //
  B extends Board,
  S extends Chips,
> = {
  board: B;
  state: [B[number][number]] extends [Chips]
    ? "Draw"
    : boolean extends [
          //
          CheckDirectionWinFor<B, S>,
          CheckDirectionWinFor<GetDiagonals<B>, S>,
        ][number]
      ? WinnerForState[S]
      : NextChip[S];
};

export type Connect4<
  //
  GS extends GameState,
  Column extends number,
> = GS["state"] extends Chips //
  ? SetState<SetChipOnBoard<GS["board"], GS["state"], Column>, GS["state"]>
  : GS;
