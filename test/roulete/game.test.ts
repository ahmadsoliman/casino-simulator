import { describe, expect, it } from "vitest";
import {
  BETS,
  BET_NAMES,
  Bet,
  BinBuilder,
  Game,
  Passenger57,
  Table,
  WHEEL_SIZE,
  Wheel,
} from "../../src";
import { getRandomIndicesWithSeed } from "../../src/utils";

describe("Game Class", () => {
  it("should run game", () => {
    const wheel = new Wheel();
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();
    const player = new Passenger57(table, wheel);
    const game = new Game(wheel, table);

    game.cycle(player);
    expect(table.bets.length).toBe(0);

    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
  });

  it("should run game with seed and get ", () => {
    const seed = 111;
    const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();
    const game = new Game(wheel, table);

    const binName = (binNumber: number) =>
      binNumber < 37 ? String(binNumber) : "00";
    const straightBet = (binNumber: string) =>
      new Bet(
        100,
        wheel.getOutcome(`${BET_NAMES[BETS.STRAIGHT]} ${binNumber}`)
      );
    const fiveBet = new Bet(
      100,
      wheel.getOutcome(`${BET_NAMES[BETS.FIVE]} {0,00,1,2,3}`)
    );

    let curIndex = 0;
    const player = new Passenger57(table, wheel);
    player.placeBets = () => {
      const curBinName = binName(randomIndices[curIndex]);
      table.placeBet(straightBet(curBinName));
      if (curBinName === "00") {
        table.placeBet(fiveBet);
      }
      curIndex++;
    };

    expect(game.cycle(player)).toEqual([straightBet(binName(37)), fiveBet]);

    expect(game.cycle(player)).toEqual([straightBet(binName(30))]);

    expect(game.cycle(player)).toEqual([straightBet(binName(4))]);

    expect(game.cycle(player)).toEqual([straightBet(binName(18))]);
  });
});
