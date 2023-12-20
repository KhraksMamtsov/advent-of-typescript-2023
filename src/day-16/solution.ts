type Santa = "🎅🏼";
type SantaOrTree = Santa | "🎄";
type Row = ReadonlyArray<SantaOrTree>;
type Forest = ReadonlyArray<Row>;

type Some<X> = {
  readonly tag: "some";
  readonly some: X;
};
export type None = {
  readonly tag: "none";
};

type FindSantaInRow<
  R extends Row,
  I extends ReadonlyArray<number> = [],
> = R extends readonly [infer H, ...infer T extends Row]
  ? H extends Santa
    ? Some<I["length"]>
    : FindSantaInRow<T, [...I, 0]>
  : None;

export type FindSanta<
  F extends Forest,
  I extends ReadonlyArray<number> = [],
> = F extends readonly [infer R extends Row, ...infer RestForest extends Forest]
  ? FindSantaInRow<R> extends Some<number>
    ? [I["length"], FindSantaInRow<R>["some"]]
    : FindSanta<RestForest, [...I, 0]>
  : None;
