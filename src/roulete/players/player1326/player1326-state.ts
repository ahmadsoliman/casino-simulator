import { Bet } from "../../../core";
import { Player1326 } from "./player1326";
import {
  Player1326NoWins,
  Player1326States,
  STATE_FACTORY,
} from "./player1326-states";

export abstract class Player1326State {
  // Has to be instantiated by children
  protected _betMultiplier: number = 1;
  protected _nextStateWin?: Player1326State;

  constructor(protected _player: Player1326) {}

  currentBet(): Bet {
    return new Bet(
      this._betMultiplier * this._player.table.minimum,
      this._player.outcome
    );
  }

  nextWon(): Player1326State {
    return (
      this._nextStateWin ||
      STATE_FACTORY.get(Player1326States.NO_WINS, this._player)
    );
  }

  nextLost(): Player1326State {
    return new Player1326NoWins(this._player);
  }
}
