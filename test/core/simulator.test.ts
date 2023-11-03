import { describe, expect, it } from "vitest";
import {
  BinBuilder,
  Game,
  Martingale,
  Simulator,
  Table,
  Wheel,
} from "../../src";

describe("Simulator Class", () => {
  it("should run simulator with a player", () => {
    const seed = 111;
    // const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();
    const game = new Game(wheel, table);

    const player = new Martingale(table, wheel, 1000, 250);

    const simulator = new Simulator(game, player);
    simulator.gather();

    expect(simulator.durations).toEqual([
      126, 49, 169, 139, 231, 28, 16, 170, 45, 250, 31, 69, 68, 62, 62, 47, 27,
      22, 63, 12, 13, 26, 177, 54, 36, 108, 37, 47, 20, 6, 106, 49, 56, 20, 28,
      16, 29, 12, 14, 56, 101, 76, 99, 63, 21, 53, 127, 165, 9, 21,
    ]);
    expect(simulator.maxima).toEqual([
      3310, 1860, 4080, 3560, 5370, 1400, 1210, 4200, 1770, 5980, 1580, 2440,
      2080, 2050, 2100, 1930, 1410, 1320, 2240, 1120, 1160, 1440, 4790, 1860,
      1540, 2980, 1560, 1830, 1260, 1020, 2870, 1940, 2000, 1260, 1450, 1230,
      1410, 1130, 1180, 2170, 2920, 2430, 3020, 2130, 1370, 2180, 3390, 4320,
      1070, 1280,
    ]);

    console.log(`Simulation data:
      Average Duration: ${
        simulator.durations.reduce((pr, cur) => pr + cur, 0) /
        simulator.durations.length
      }
      Average Maxima: ${
        simulator.maxima.reduce((pr, cur) => pr + cur, 0) /
        simulator.maxima.length
      }`);
  });
});
