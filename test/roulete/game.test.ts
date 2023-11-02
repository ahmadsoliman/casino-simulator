import { describe, expect, it } from "vitest";
import {
  BETS,
  BET_NAMES,
  Bet,
  BinBuilder,
  Game,
  InvalidBet,
  Martingale,
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
    const player = new Passenger57(table, wheel, 1000, 10);
    const game = new Game(wheel, table);

    game.cycle(player);
    expect(table.bets.length).toBe(0);

    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
  });

  it("should run game with seed ", () => {
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
    const player = new Passenger57(table, wheel, 1000, 10);
    player.placeBets = () => {
      const curBinName = binName(randomIndices[curIndex]);
      table.placeBet(straightBet(curBinName));
      if (curBinName === "00") {
        table.placeBet(fiveBet);
      }
      curIndex++;
    };

    expect(game.cycle(player)).toEqual([straightBet(binName(37)), fiveBet]);
    expect(player.stake).toBe(5300);

    expect(game.cycle(player)).toEqual([straightBet(binName(30))]);
    expect(player.stake).toBe(8900);

    expect(game.cycle(player)).toEqual([straightBet(binName(4))]);

    expect(game.cycle(player)).toEqual([straightBet(binName(18))]);

    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
    game.cycle(player);

    // No bets placed, turns done
    expect(game.cycle(player)).toEqual([]);
  });

  it("should run game with martingale player", () => {
    const seed = 111;
    // const randomIndices = getRandomIndicesWithSeed(seed, WHEEL_SIZE);

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table();
    const game = new Game(wheel, table);

    const player = new Martingale(
      table,
      wheel,
      1000,
      Math.floor(Math.random() * 200)
    );
    console.log("PLAYER STARTED PLAYING WITH $" + player.stake);

    game.cycle(player);
    expect(player.stake).toBe(1000 - 10);
    game.cycle(player);
    expect(player.stake).toBe(1000 - 10 - 10 * Math.pow(2, 1));
    game.cycle(player);
    expect(player.stake).toBe(
      1000 - 10 - 10 * Math.pow(2, 1) + 2 * 10 * Math.pow(2, 2)
    );
    game.cycle(player);
    expect(player.stake).toBe(
      1000 - 10 - 10 * Math.pow(2, 1) + 2 * 10 * Math.pow(2, 2) - 10
    );
    game.cycle(player);
    expect(player.stake).toBe(
      1000 - // init
        10 - // first loss
        10 * Math.pow(2, 1) + // second loss
        2 * 10 * Math.pow(2, 2) - // third win
        10 - // first loss
        10 * Math.pow(2, 1) // second loss
    );
    try {
      while (player.isPlaying()) {
        expect(player.stake > table.minimum).toBeTruthy();

        game.cycle(player);

        if (player.roundsToGo === 0) {
          console.log("PLAYER FINISHED PLAYING WITH STAKE $" + player.stake);
          expect(player.isPlaying()).toBeFalsy();
        }
      }
    } catch (error) {
      console.log(
        "PLAYER STOPPED PLAYING DUE TO REACHING TABLE LIMIT WITH STAKE $" +
          player.stake
      );
      expect(error instanceof InvalidBet).toBeTruthy();
    }
  });
});
