import { describe, expect, it } from "vitest";
import {
  BinBuilder,
  Game,
  Martingale,
  SevenReds,
  Simulator,
  Table,
  Wheel,
} from "../../src";

describe("Simulator Class", () => {
  it("should run simulator with a Martingale player", () => {
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
  it("should run simulator with a SevenReds player", () => {
    const seed = 111;
    // const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();
    const game = new Game(wheel, table);

    const player = new SevenReds(table, wheel, 1000, 250);

    const simulator = new Simulator(game, player);
    simulator.gather();

    expect(simulator.durations).toEqual([
      344, 979, 239, 923, 111, 705, 211, 421, 352, 841, 104, 123, 271, 121, 532,
      675, 118, 51, 450, 226, 365, 468, 406, 185, 433, 492, 151, 308, 417, 679,
      1619, 114, 186, 477, 462, 118, 80, 32, 831, 376, 212, 613, 667, 878, 172,
      213, 442, 72, 409, 1019,
    ]);
    expect(simulator.maxima).toEqual([
      4050, 2380, 1900, 1170, 2110, 4200, 1040, 1020, 1730, 1620, 1870, 2770,
      1200, 1780, 1600, 1600, 2170, 1000, 1280, 3030, 2150, 1650, 1380, 1280,
      1460, 1900, 3320, 1620, 3070, 1520, 1090, 2950, 1790, 4790, 1240, 1410,
      1860, 1080, 1000, 1020, 1050, 3920, 1270, 2260, 1620, 1930, 2070, 1460,
      2110, 3310,
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
