import { describe, expect, it } from "vitest";
import { Outcome } from "../src";

describe("Outcome Class", () => {
  it("Calculates win amount and handles equality correctly", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Red", 1);
    const o3 = new Outcome("Black", 2);

    expect(o3.winAmount(10)).toBe(20);
    expect(o1.toString()).toBe("Red 1:1");
    expect(o1.repr()).toBe("Outcome(name='Red', odds=1)");
    expect(o1.equals(o2)).toBeTruthy();
    expect(o1.odds).toBe(1);
    expect(o1.name).toBe("Red");
    expect(o1.equals(o3)).toBeFalsy();
    expect(o2.equals(o3)).toBeFalsy();
    expect(o1.hash()).toBe(82033);
  });
});
