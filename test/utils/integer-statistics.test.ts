import { describe, expect, it } from "vitest";
import { IntegerStatistics } from "../../src/utils";

describe("Integer Statistics Class", () => {
  it("should calculate mean and standard deviation", () => {
    const arr = new IntegerStatistics(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5);
    expect(arr.sum()).toBe(99);
    expect(arr.mean()).toBe(9);
    expect(arr.standardDeviation()).toBe(3.317);
  });
});
