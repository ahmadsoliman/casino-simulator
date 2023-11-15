import { Bet } from "../../../core";
import { Player1326 } from "./player1326";
import { Player1326NoWins } from "./player1326-states";

export abstract class Player1326State {
  constructor(protected _player: Player1326) {}

  currentBet(): Bet {
    throw "currentBet() isn't implemented";
  }

  nextWon(): Player1326State {
    throw "nextWon() isn't implemented";
  }

  nextLost(): Player1326State {
    return new Player1326NoWins(this._player);
  }
}
