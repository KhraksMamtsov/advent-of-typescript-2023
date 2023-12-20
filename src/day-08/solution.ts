export type RemoveNaughtyChildren<X extends Record<string, unknown>> = {
  [K in keyof X as K extends `naughty_${string}` ? never : K]: X[K];
};
