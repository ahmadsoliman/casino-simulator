import { describe, expect, it } from "vitest";
import { BinBuilder, PlayerRandom, Table, Wheel } from "../../../src";
import { getRandomIndicesWithSeed } from "../../../src/utils";

describe("PlayerRandom Player Class", () => {
  it("should simulate game for player", () => {
    const seed = 11;

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const randomIndices = getRandomIndicesWithSeed(
      seed,
      wheel.allOutcomes.size,
      10
    );
    const outcomeNames = [...wheel.allOutcomes.keys()];

    const table = new Table(10, 1000);

    const player = new PlayerRandom(table, wheel, 1000, 10, seed);

    for (let i = 0; i < 10; i++) {
      const randomKey = outcomeNames[randomIndices[i]];
      const randomOutcome = wheel.allOutcomes.get(randomKey);
      player.placeBets();
      expect(table.bets[0].outcome.equals(randomOutcome!)).toBeTruthy();
      table.deleteBet(table.bets[0]);
    }
  });
});
