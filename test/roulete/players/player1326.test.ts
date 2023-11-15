import { describe, expect, it } from "vitest";
import {
  Bet,
  BinBuilder,
  Player1326,
  Player1326NoWins,
  Player1326OneWin,
  Player1326State,
  Player1326ThreeWins,
  Player1326TwoWins,
  Table,
  Wheel,
} from "../../../src";

describe("PlayerRandom Player Class", () => {
  it("should test state classes", () => {
    const seed = 11;

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table(10, 1000);

    const player = new Player1326(table, wheel, 1000, 10);

    let playerState: Player1326State = new Player1326NoWins(player);

    expect(
      playerState.currentBet().equals(new Bet(10, player.outcome))
    ).toBeTruthy();

    expect(playerState).toBeInstanceOf(Player1326NoWins);
    playerState = playerState.nextWon();
    expect(playerState).toBeInstanceOf(Player1326OneWin);
    playerState = playerState.nextWon();
    expect(playerState).toBeInstanceOf(Player1326TwoWins);
    playerState = playerState.nextWon();
    expect(playerState).toBeInstanceOf(Player1326ThreeWins);
    playerState = playerState.nextWon();
    expect(playerState).toBeInstanceOf(Player1326NoWins);

    playerState = playerState.nextWon();
    playerState = playerState.nextLost();
    expect(playerState).toBeInstanceOf(Player1326NoWins);

    playerState = playerState.nextWon();
    playerState = playerState.nextWon();
    playerState = playerState.nextLost();
    expect(playerState).toBeInstanceOf(Player1326NoWins);

    playerState = playerState.nextWon();
    playerState = playerState.nextWon();
    playerState = playerState.nextWon();
    playerState = playerState.nextLost();
    expect(playerState).toBeInstanceOf(Player1326NoWins);
  });
  it("should simulate game for player", () => {
    const seed = 11;

    const wheel = new Wheel(seed);
    const binBuilder = new BinBuilder();
    binBuilder.buildBins(wheel);

    const table = new Table(10, 1000);

    const player = new Player1326(table, wheel, 1000, 100);
    let winCount = 0;

    for (let i = 0; i < 100; i++) {
      expect(player.isPlaying()).toBeTruthy();
      player.placeBets();

      const winningBin = wheel.choose();

      table.bets.forEach(bet => {
        if (winningBin.has(bet.outcome)) {
          player.win(bet);
          winCount++;
          switch (winCount) {
            case 1:
              expect(player.state).toBeInstanceOf(Player1326OneWin);
              break;
            case 2:
              expect(player.state).toBeInstanceOf(Player1326TwoWins);
              break;
            case 3:
              expect(player.state).toBeInstanceOf(Player1326ThreeWins);
              break;
            case 4:
              expect(player.state).toBeInstanceOf(Player1326NoWins);
              break;
          }
        } else {
          player.lose(bet);
          winCount = 0;
          expect(player.state).toBeInstanceOf(Player1326NoWins);
        }
        table.deleteBet(bet);
      });
    }
    expect(player.roundsToGo).toBe(0);
    expect(player.isPlaying()).toBeFalsy();
  });
});
