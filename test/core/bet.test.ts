import { describe, expect, it } from "vitest";
import { Outcome, Bet } from "../../src";

describe("Bet Class", () => {
  it("Initialize bet with different inputs correctly", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 17);

    const b1 = new Bet(1500, o1);
    expect(b1.winAmount()).toBe(1500 * 2);
    expect(b1.loseAmount()).toBe(1500);

    const b2 = new Bet(100, o2);
    expect(b2.winAmount()).toBe(100 * 18);
    expect(b2.loseAmount()).toBe(100);
  });
});
