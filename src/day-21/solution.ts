type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type AnyRow = [string, string, string];
type WinRowFor<X extends TicTacToeChip> = [X, X, X];
type WinRowsFor<X extends TicTacToeChip> =
  | [AnyRow, AnyRow, WinRowFor<X>]
  | [AnyRow, WinRowFor<X>, AnyRow]
  | [WinRowFor<X>, AnyRow, AnyRow];

type WinColumnsFor<X extends TicTacToeChip> =
  | [[X, string, string], [X, string, string], [X, string, string]]
  | [[string, X, string], [string, X, string], [string, X, string]]
  | [[string, string, X], [string, string, X], [string, string, X]];

type WinDiagonalsFor<X extends TicTacToeChip> =
  | [[X, string, string], [string, X, string], [string, string, X]]
  | [[string, string, X], [string, X, string], [X, string, string]];

type WinCombinationFor<X extends TicTacToeChip> =
  | WinRowsFor<X>
  | WinColumnsFor<X>
  | WinDiagonalsFor<X>;

type EmptyBoard = [
  [TicTacToeEmptyCell, TicTacToeEmptyCell, TicTacToeEmptyCell],
  [TicTacToeEmptyCell, TicTacToeEmptyCell, TicTacToeEmptyCell],
  [TicTacToeEmptyCell, TicTacToeEmptyCell, TicTacToeEmptyCell],
];

type YCoord = {
  top: [];
  middle: [0];
  bottom: [0, 0];
};
type XCoord = {
  left: [];
  center: [0];
  right: [0, 0];
};

type NextChip = {
  "❌": "⭕";
  "⭕": "❌";
};

type Coords<Pos extends TicTacToePositions> = Pos extends `${infer YPos extends
  TicTacToeYPositions}-${infer XPos extends TicTacToeXPositions}`
  ? {
      y: YCoord[YPos];
      x: XCoord[XPos];
    }
  : never;

type RowStep<
  Row extends TicTacToeCell[],
  Chip extends TicTacToeChip,
  Coord extends 0[],
> = {
  [K in keyof Row]: K extends `${Coord["length"]}`
    ? Row[K] extends TicTacToeEmptyCell
      ? Chip
      : Row[K]
    : Row[K];
};

type BoardStep<
  B extends TicTactToeBoard,
  Chip extends TicTacToeChip,
  Coords extends { y: 0[]; x: 0[] },
> = {
  [K in keyof B]: K extends `${Coords["y"]["length"]}`
    ? RowStep<B[K], Chip, Coords["x"]>
    : B[K];
};

type Step<
  G extends TicTacToeGame,
  Coords extends { y: 0[]; x: 0[] },
> = G["state"] extends TicTacToeChip
  ? {
      board: BoardStep<G["board"], G["state"], Coords>;
      state: BoardStep<G["board"], G["state"], Coords> extends G["board"]
        ? G["state"]
        : NextChip[G["state"]];
    }
  : G;

export type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type EnshureTerminal<G extends TicTacToeGame> =
  G["board"] extends WinCombinationFor<"❌">
    ? {
        board: G["board"];
        state: "❌ Won";
      }
    : G["board"] extends WinCombinationFor<"⭕">
      ? {
          board: G["board"];
          state: "⭕ Won";
        }
      : TicTacToeEmptyCell extends G["board"][number][number]
        ? G
        : {
            board: G["board"];
            state: "Draw";
          };

export type TicTacToe<
  G extends TicTacToeGame,
  Pos extends TicTacToePositions,
> = Step<G, Coords<Pos>> extends infer NextG extends TicTacToeGame
  ? EnshureTerminal<NextG>
  : never;
