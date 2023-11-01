// class Game
// Game manages the sequence of actions that defines the game of Roulette. This includes notifying the Player object to place bets, spinning the Wheel object and resolving the Bet instances actually present on the Table object.

import { Table } from "../core";
import { Passenger57 } from "./Passenger57";
import { Wheel } from "./wheel";

export class Game {
  constructor(
    private _wheel: Wheel,
    private _table: Table
  ) {}

  cycle(player: Passenger57) {
    player.placeBets();

    const winningBin = this._wheel.choose();

    this._table.bets.forEach(bet => {
      if (winningBin.has(bet.outcome)) {
        player.win(bet);
      } else {
        player.lose(bet);
      }
      this._table.deleteBet(bet);
    });
  }
}
