export type SantaListProtector<X> = {
  readonly [K in keyof X]: X[K] extends () => unknown ? X[K] : SantaListProtector<X[K]>
}
