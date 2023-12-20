// Num
// 0 = []
// 1 = [0]
// 2 = [0, 0]
type Num = ReadonlyArray<0>;
type FromLiteral<X extends number, N extends Num = []> = N["length"] extends X
  ? N
  : FromLiteral<X, [...N, 0]>;

type Sum<A extends Num, B extends Num> = [...A, ...B];

type GetNumber<A extends Num> = A["length"];

type One = FromLiteral<1>;

// NumRange
type NumRange = ReadonlyArray<Num>;
type FromBounds<
  From extends Num,
  To extends Num,
  R extends NumRange = [],
  Last extends Num = From,
> = Last extends To
  ? [...R, Last]
  : FromBounds<From, To, [...R, Last], Sum<Last, One>>;

type GetLiterals<NR extends NumRange> = GetNumber<NR[number]>;

// Solution

export type DayCounter<From extends number, To extends number> = GetLiterals<
  FromBounds<FromLiteral<From>, FromLiteral<To>>
>;
