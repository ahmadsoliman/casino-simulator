// class Game
// Game manages the sequence of actions that defines the game of Roulette. This includes notifying the Player object to place bets, spinning the Wheel object and resolving the Bet instances actually present on the Table object.

import { Bet, Table } from "../core";
import { Player } from "./player";
import { Wheel } from "./wheel";

export class Game {
  public get wheel(): Wheel {
    return this._wheel;
  }

  public get table(): Table {
    return this._table;
  }

  constructor(
    private _wheel: Wheel,
    private _table: Table
  ) {}

  cycle(player: Player) {
    const winningBets: Bet[] = [];

    if (player.isPlaying()) {
      player.placeBets();

      const winningBin = this._wheel.choose();

      this._table.bets.forEach(bet => {
        if (winningBin.has(bet.outcome)) {
          player.win(bet);
          winningBets.push(bet);
        } else {
          player.lose(bet);
        }
        this._table.deleteBet(bet);
      });
    }

    return winningBets;
  }
}
