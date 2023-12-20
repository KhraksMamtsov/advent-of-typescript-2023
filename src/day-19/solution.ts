export type Skateboard = "🛹";
export type BmxBike = "🚲";
export type Scooter = "🛴";
export type Surfboard = "🏄";
type Items<
  I extends string,
  C extends number,
  R extends ReadonlyArray<string> = [],
> = R["length"] extends C ? R : Items<I, C, [...R, I]>;

export type Rebuild<
  List extends ReadonlyArray<number>,
  Loop extends ReadonlyArray<string> = ["🛹", "🚲", "🛴", "🏄"],
  R extends ReadonlyArray<string> = [],
> = [List, Loop] extends [
  [infer H extends number, ...infer Rest extends ReadonlyArray<number>],
  [infer LH extends string, ...infer LRest extends ReadonlyArray<string>],
]
  ? Rest extends []
    ? [...R, ...Items<LH, H>]
    : [...R, ...Items<LH, H>] extends infer S extends ReadonlyArray<string>
      ? Rebuild<Rest, [...LRest, LH], S>
      : never
  : never;
