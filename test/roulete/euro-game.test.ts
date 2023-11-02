import { describe, expect, it } from "vitest";
import { EuroBinBuilder, EuroZeroPlayer, Game, Table, Wheel } from "../../src";

describe("Euro Game", () => {
  it("should run a euro game", () => {
    const wheel = new Wheel();
    const euroBinBuilder = new EuroBinBuilder();
    euroBinBuilder.buildBins(wheel);

    const table = new Table();
    const player = new EuroZeroPlayer(table, wheel, 1000, 10);
    const game = new Game(wheel, table);

    game.cycle(player);
    expect(table.bets.length).toBe(0);

    game.cycle(player);
    game.cycle(player);
    game.cycle(player);
  });
});
