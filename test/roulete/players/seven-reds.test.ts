import { describe, expect, it } from "vitest";
import {
  BETS,
  BET_NAMES,
  BinBuilder,
  RED_COUNT,
  SevenReds,
  Table,
  Wheel,
} from "../../../src";

describe("Martingale Player Class", () => {
  it("should simulate game for player", () => {
    const seed = 11;
    // const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();

    const player = new SevenReds(table, wheel, 1000, 10);

    let redCount = RED_COUNT;
    while (redCount > 0) {
      player.placeBets();
      expect(table.bets).toEqual([]);
      const winningBin = wheel.choose();
      player.winners(winningBin);
      if (
        [...winningBin.keys()].some(
          outcome => outcome.name === BET_NAMES[BETS.RED]
        )
      ) {
        redCount--;
      } else {
        redCount = RED_COUNT;
      }
    }

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
