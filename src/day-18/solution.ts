export type Count<
  XS extends ReadonlyArray<string>,
  X extends string,
  R extends ReadonlyArray<0> = [],
> = XS extends readonly [
  infer Head,
  ...infer RestXS extends ReadonlyArray<string>,
]
  ? X extends Head
    ? Count<RestXS, X, [...R, 0]>
    : Count<RestXS, X, R>
  : R["length"];
