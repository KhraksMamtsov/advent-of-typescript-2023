export type BoxToys<
  S,
  L extends number,
  R extends ReadonlyArray<S> = [],
> = L extends L
  ? R["length"] extends L
    ? R
    : BoxToys<S, L, [...R, S]>
  : never;
