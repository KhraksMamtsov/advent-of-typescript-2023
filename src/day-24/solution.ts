type Alley = "  ";
type Santa = "🎅";
type Tree = "🎄";
type MazeItem = Tree | Santa | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeRow = MazeItem[];
type MazeMatrix = MazeRow[];
type Directions = "up" | "down" | "left" | "right";
type Num = 0[];
type Inc<N extends Num> = [...N, 0];
type Dec<N extends Num> = N extends [0, ...infer Tail] ? Tail : never;

type Position = [row: Num, col: Num];

type GetSantaRowPosition<MR extends MazeRow, R extends 0[] = []> = MR extends [
  infer H extends MazeItem,
  ...infer Tail extends MazeRow,
]
  ? H extends Santa
    ? R
    : GetSantaRowPosition<Tail, [...R, 0]>
  : null;

type GetSantaPosition<
  //
  MM extends MazeMatrix,
  R extends 0[] = [],
> = MM extends [
  //
  infer H extends MazeRow,
  ...infer Tail extends MazeMatrix,
]
  ? GetSantaRowPosition<H> extends null
    ? GetSantaPosition<Tail, [...R, 0]>
    : [R, GetSantaRowPosition<H>]
  : null;

type NextPos<Pos extends Position> = {
  up: [Dec<Pos[0]>, Pos[1]];
  down: [Inc<Pos[0]>, Pos[1]];
  left: [Pos[0], Dec<Pos[1]>];
  right: [Pos[0], Inc<Pos[1]>];
};

type GetItem<
  MM extends MazeMatrix,
  Pos extends Position,
> = MM[Pos[0]["length"]][Pos[1]["length"]];

type SetItemInRowPosition<
  MR extends MazeRow,
  Target extends Num,
  Item extends MazeItem,
  Prev extends MazeRow = [],
> = MR extends [infer H extends MazeItem, ...infer Tail extends MazeRow]
  ? Prev["length"] extends Target["length"]
    ? [...Prev, Item, ...Tail]
    : SetItemInRowPosition<Tail, Target, Item, [...Prev, H]>
  : never;

type SetItemPosition<
  MM extends MazeMatrix,
  Pos extends Position,
  Item extends MazeItem,
  Prev extends MazeMatrix = [],
> = MM extends [infer H extends MazeRow, ...infer Tail extends MazeMatrix]
  ? Prev["length"] extends Pos[0]["length"]
    ? [...Prev, SetItemInRowPosition<H, Pos[1], Item>, ...Tail]
    : SetItemPosition<Tail, Pos, Item, [...Prev, H]>
  : never;

type IsTerminalDirection<
  MM extends MazeMatrix,
  P extends Position,
  D extends Directions,
> = [0, "up"] extends [P[0]["length"], D]
  ? true
  : [0, "left"] extends [P[1]["length"], D]
    ? true
    : [MM[number]["length"], "right"] extends [P[1]["length"], D]
      ? true
      : [MM["length"], "down"] extends [P[0]["length"], D]
        ? true
        : false;

type FillCookie<
  MM extends MazeMatrix,
  R extends DELICIOUS_COOKIES[][] = [],
> = MM extends [infer H extends MazeRow, ...infer Tail extends MazeMatrix]
  ? FillCookie<Tail, [...R, FillRowCookie<H>]>
  : R;

type FillRowCookie<
  MR extends MazeRow,
  R extends DELICIOUS_COOKIES[] = [],
> = MR extends [infer H, ...infer Tail extends MazeRow]
  ? FillRowCookie<Tail, [...R, DELICIOUS_COOKIES]>
  : R;

export type Move<
  MM extends MazeMatrix,
  D extends Directions,
> = GetSantaPosition<MM> extends infer P extends Position
  ? IsTerminalDirection<MM, P, D> extends true
    ? FillCookie<MM>
    : NextPos<P>[D] extends infer NP extends Position
      ? GetItem<MM, NP> extends Alley
        ? SetItemPosition<SetItemPosition<MM, P, Alley>, NP, Santa>
        : MM
      : MM
  : MM;
