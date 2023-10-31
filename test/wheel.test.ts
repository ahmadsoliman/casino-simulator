import { describe, expect, it } from "vitest";
import { Bin, Outcome, WHEEL_SIZE, Wheel } from "../src";
import { rand } from "../src/utils/rng";

describe("Wheel Class", () => {
  it("should add bins to wheel", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 1);
    const o3 = new Outcome("Even", 1);
    const b2 = new Bin(o2);
    const wheel = new Wheel();

    wheel.addOutcome(1, o1);
    wheel.addOutcome(1, o3);
    wheel.addOutcome(2, o2);

    expect(wheel.get(1)).toEqual(new Bin([new Outcome("Red", 1), o3]));
    expect(wheel.get(2)).toEqual(b2);
  });

  it("should choose any amount of bins", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 1);
    const o3 = new Outcome("Even", 1);
    const wheel = new Wheel();

    wheel.addOutcome(1, o1);
    wheel.addOutcome(1, o3);
    wheel.addOutcome(2, o2);

    for (let i = 0; i < 1000; i++) {
      expect(wheel.choose());
    }
  });

  it("should choose correct random bin", () => {
    const seed = 111;
    const rng = rand(seed);
    const randomIndices = [...Array(4)].map(() =>
      Math.round(rng() * (WHEEL_SIZE - 1))
    );

    const wheel = new Wheel(seed);
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 1);
    const o3 = new Outcome("Even", 1);
    const b1 = new Bin(o1, o3);
    const b2 = new Bin(o2);

    wheel.addOutcome(randomIndices[0], o1);
    wheel.addOutcome(randomIndices[0], o3);
    wheel.addOutcome(randomIndices[1], o2);
    wheel.addOutcome(randomIndices[2], o1);
    wheel.addOutcome(randomIndices[2], o3);
    wheel.addOutcome(randomIndices[3], o2);

    expect(wheel.choose()).toEqual(b1);
    expect(wheel.choose()).toEqual(b2);
    expect(wheel.choose()).toEqual(b1);
    expect(wheel.choose()).toEqual(b2);
  });

  it("should add outcomes to allOutcomes", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 1);
    const o3 = new Outcome("Even", 1);
    const wheel = new Wheel();

    wheel.addOutcome(1, o1);
    wheel.addOutcome(1, o3);
    wheel.addOutcome(2, o2);
    wheel.addOutcome(2, o1);
    wheel.addOutcome(2, new Outcome("Red", 10));

    expect(wheel.getOutcome(o1.name)).toEqual(o1);
    expect(wheel.getOutcome(o2.name)).toEqual(o2);
    expect(wheel.getOutcome(o3.name)).toEqual(o3);
  });
});
