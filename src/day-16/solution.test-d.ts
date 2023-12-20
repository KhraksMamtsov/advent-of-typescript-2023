import { test, expectTypeOf } from "vitest";
import type { FindSanta, None } from "./solution";

test("day-16", () => {
  expectTypeOf<
    FindSanta<
      [
        ["🎅🏼", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<[0, 0]>();

  expectTypeOf<
    FindSanta<
      [
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎅🏼", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<[3, 1]>();

  expectTypeOf<
    FindSanta<
      [
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎅🏼", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<[2, 2]>();

  expectTypeOf<
    FindSanta<
      [
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎅🏼", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<[2, 1]>();

  expectTypeOf<
    FindSanta<
      [
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎅🏼", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<[1, 2]>();

  expectTypeOf<
    FindSanta<
      [
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
        ["🎄", "🎄", "🎄", "🎄", "🎄"],
      ]
    >
  >().toEqualTypeOf<None>();
});