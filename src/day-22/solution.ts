/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

type SudokuPiece = [Reindeer, Reindeer, Reindeer];
type SudokuUnitFlat = [...SudokuPiece, ...SudokuPiece, ...SudokuPiece];
type SudokuUnit = [SudokuPiece, SudokuPiece, SudokuPiece];
type Sudoku = [
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
  SudokuUnit,
];

type ValidateSudokuUnit<
  SUF extends Reindeer[],
  Prev extends Reindeer = never,
  R extends boolean = true,
> = SUF extends [infer H extends Reindeer, ...infer Tail extends Reindeer[]]
  ? H extends Prev
    ? false
    : ValidateSudokuUnit<Tail, Prev | H>
  : R;

type FlatSudokuUnit<
  SU extends Reindeer[][],
  R extends Reindeer[] = [],
> = SU extends [infer H extends Reindeer[], ...infer T extends Reindeer[][]]
  ? FlatSudokuUnit<T, [...R, ...H]>
  : R;

type ValidateUnits<
  Board extends SudokuUnit[],
  R extends boolean = true,
> = Board extends [
  infer Row extends SudokuUnit,
  ...infer RestRows extends SudokuUnit[],
]
  ? [ValidateSudokuUnit<FlatSudokuUnit<Row>>] extends [false]
    ? false
    : ValidateUnits<RestRows>
  : R;

/*
 * It was the day of the New Year's corporate party, I think it's a great joke how Not to do it)
 */
export type Validate<S extends Sudoku> = [
  ValidateUnits<S>, // Rows
  ValidateUnits<
    // Areas
    [
      [S[0][0], S[1][0], S[2][0]],
      [S[0][1], S[1][1], S[2][1]],
      [S[0][2], S[1][2], S[2][2]],

      [S[3][0], S[4][0], S[5][0]],
      [S[3][1], S[4][1], S[5][1]],
      [S[3][2], S[4][2], S[5][2]],

      [S[6][0], S[7][0], S[8][0]],
      [S[6][1], S[7][1], S[8][1]],
      [S[6][2], S[7][2], S[8][2]],
    ]
  >,
  ValidateUnits<
    // Columns
    [
      [
        [S[0][0][0], S[1][0][0], S[2][0][0]],
        [S[3][0][0], S[4][0][0], S[5][0][0]],
        [S[6][0][0], S[7][0][0], S[8][0][0]],
      ],
      [
        [S[0][0][1], S[1][0][1], S[2][0][1]],
        [S[3][0][1], S[4][0][1], S[5][0][1]],
        [S[6][0][1], S[7][0][1], S[8][0][1]],
      ],
      [
        [S[0][0][2], S[1][0][2], S[2][0][2]],
        [S[3][0][2], S[4][0][2], S[5][0][2]],
        [S[6][0][2], S[7][0][2], S[8][0][2]],
      ],

      [
        [S[0][1][0], S[1][1][0], S[2][1][0]],
        [S[3][1][0], S[4][1][0], S[5][1][0]],
        [S[6][1][0], S[7][1][0], S[8][1][0]],
      ],
      [
        [S[0][1][1], S[1][1][1], S[2][1][1]],
        [S[3][1][1], S[4][1][1], S[5][1][1]],
        [S[6][1][1], S[7][1][1], S[8][1][1]],
      ],
      [
        [S[0][1][2], S[1][1][2], S[2][1][2]],
        [S[3][1][2], S[4][1][2], S[5][1][2]],
        [S[6][1][2], S[7][1][2], S[8][1][2]],
      ],

      [
        [S[0][2][0], S[1][2][0], S[2][2][0]],
        [S[3][2][0], S[4][2][0], S[5][2][0]],
        [S[6][2][0], S[7][2][0], S[8][2][0]],
      ],
      [
        [S[0][2][1], S[1][2][1], S[2][2][1]],
        [S[3][2][1], S[4][2][1], S[5][2][1]],
        [S[6][2][1], S[7][2][1], S[8][2][1]],
      ],
      [
        [S[0][2][2], S[1][2][2], S[2][2][2]],
        [S[3][2][2], S[4][2][2], S[5][2][2]],
        [S[6][2][2], S[7][2][2], S[8][2][2]],
      ],
    ]
  >,
][number] extends true
  ? true
  : false;
