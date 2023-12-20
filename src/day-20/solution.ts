type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

// ==== String ====

type Line = ReadonlyArray<string>;
type Lines = ReadonlyArray<Line>;

type SplitString<
  S extends string,
  R extends ReadonlyArray<string> = [],
> = S extends `${infer SHead}${infer SRest}`
  ? SplitString<SRest, [...R, SHead]>
  : R;

type GetLines<
  S extends Line,
  Acc extends Line = [],
  R extends Lines = [],
> = S extends [infer SHead extends string, ...infer SRest extends Line]
  ? SHead extends "\n"
    ? GetLines<SRest, [], [...R, Acc]>
    : GetLines<SRest, [...Acc, SHead], R>
  : [...R, Acc];

type KnownStringChars = keyof Letters;

type StringCharToAsciiChar<S extends string> = S extends KnownStringChars
  ? Letters[S]
  : EmptyAsciiChar;

type LineToAsciiLine<L extends Line, R extends AsciiLine = []> = L extends [
  infer HStringChar extends string,
  ...infer TStringChar extends Line,
]
  ? LineToAsciiLine<
      TStringChar,
      [...R, StringCharToAsciiChar<Uppercase<HStringChar>>]
    >
  : R;

type LinesToAsciiLines<L extends Lines, R extends AsciiLines = []> = L extends [
  infer HLine extends Line,
  ...infer TLines extends Lines,
]
  ? LinesToAsciiLines<TLines, [...R, LineToAsciiLine<HLine>]>
  : R;

// ==== AsciiChar ====

type AsciiChar = readonly [string, string, string];
type EmptyAsciiChar = readonly ["", "", ""];
type AsciiLine = ReadonlyArray<AsciiChar>;
type AsciiLines = ReadonlyArray<AsciiLine>;

type ConcatAsciiSymbols<A extends AsciiChar, B extends AsciiChar> = [
  `${A[0]}${B[0]}`,
  `${A[1]}${B[1]}`,
  `${A[2]}${B[2]}`,
] & {};

type JoinAsciiLine<
  X extends AsciiLine,
  R extends AsciiChar = EmptyAsciiChar,
> = X extends [
  infer Head extends AsciiChar,
  ...infer Tail extends ReadonlyArray<AsciiChar>,
]
  ? JoinAsciiLine<Tail, ConcatAsciiSymbols<R, Head>>
  : R;

type JoinAsciiLines<
  X extends AsciiLines,
  R extends AsciiLine = [],
> = X extends [infer Head extends AsciiLine, ...infer Tail extends AsciiLines]
  ? JoinAsciiLines<Tail, [...R, JoinAsciiLine<Head>]>
  : R;

type RenderAsciiLine<
  X extends AsciiLine,
  R extends ReadonlyArray<string> = [],
> = X extends [infer Head extends AsciiChar, ...infer Tail extends AsciiLine]
  ? RenderAsciiLine<Tail, [...R, ...Head]>
  : R;

// ==== Solution ====

export type ToAsciiArt<S extends string> = RenderAsciiLine<
  JoinAsciiLines<LinesToAsciiLines<GetLines<SplitString<S>>>>
>;
