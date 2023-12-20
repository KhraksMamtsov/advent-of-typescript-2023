export type DecipherNaughtyList<S extends string> =
  S extends `${infer Item}/${infer Rest}`
    ? Item | DecipherNaughtyList<Rest>
    : S;
