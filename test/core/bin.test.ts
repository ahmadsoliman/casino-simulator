import { describe, expect, it } from "vitest";
import { Outcome, Bin } from "../../src";

describe("Bin Class", () => {
  it("Initialize bin with different inputs correctly", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 1);
    const b1 = new Bin([o1, o2]); // init with array

    expect([...b1.values()]).toEqual([o1, o2]);
    expect(b1.toArray()).toEqual([o1, o2]);
    expect(new Bin({ o1, o2 })); // init with obj
    expect(
      new Bin([o1, o2], new Outcome("Even", 1), { o1, o2, arr: [o1, o2] })
    ); // init with args
  });
});
