export type SantaListProtector<X> = {
  readonly [K in keyof X]: X[K] extends Function
    ? X[K]
    : SantaListProtector<X[K]>;
};
