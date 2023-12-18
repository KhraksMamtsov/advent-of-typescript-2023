export type FindSanta<X extends ReadonlyArray<string>, I extends unknown[] = []> = X extends [
  infer Head,
  ...infer Tail extends string[],
]
  ? Head extends '🎅🏼'
    ? I['length']
    : FindSanta<Tail, [...I, Head]>
  : never
