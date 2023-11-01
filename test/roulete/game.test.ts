import { describe, expect, it } from "vitest";
import { BinBuilder, Game, Passenger57, Table, Wheel } from "../../src";

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
});
