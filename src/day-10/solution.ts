export type StreetSuffixTester<
  X extends string,
  S extends string,
> = X extends `${string}${S}` ? true : false;
