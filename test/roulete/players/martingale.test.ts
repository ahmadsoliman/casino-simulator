import { describe, expect, it } from "vitest";
import { BinBuilder, Martingale, Table, WHEEL_SIZE, Wheel } from "../../../src";
import { getRandomIndicesWithSeed } from "../../../src/utils";

describe("Martingale Player Class", () => {
  it("should simulate game for player", () => {
    const seed = 11;
    const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);
    console.log(randomIndices);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();

    const player = new Martingale(table, wheel, 1000, 10);

    let lossCount = 0;

    for (let i = 0; i < 10; i++) {
      expect(player.isPlaying()).toBeTruthy();
      player.placeBets();

      const winningBin = wheel.choose();

      table.bets.forEach(bet => {
        if (winningBin.has(bet.outcome)) {
          player.win(bet);
          expect(player.betMultiple).toBe(1);
          lossCount = 0;
        } else {
          player.lose(bet);
          lossCount++;
          expect(player.betMultiple).toBe(Math.pow(2, lossCount));
        }
        table.deleteBet(bet);
      });
    }
    expect(player.roundsToGo).toBe(0);
    expect(player.isPlaying()).toBeFalsy();
  });
});
