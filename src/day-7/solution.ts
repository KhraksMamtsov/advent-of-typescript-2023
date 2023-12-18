export type AppendGood<X extends Record<string, unknown>> = {
  [K in keyof X as `good_${K & string}`]: X[K]
}
