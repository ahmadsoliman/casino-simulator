import { Player1326 } from "./player1326";
import { Player1326State } from "./player1326-state";

export enum Player1326States {
  NO_WINS,
  ONE_WIN,
  TWO_WINS,
  THREE_WINS,
}

export class Player1326StateFactory {
  private _values: { [key: number]: Player1326State } = {};

  get(type: Player1326States, player: Player1326) {
    if (this._values[type]) {
      return this._values[type];
    }

    switch (type) {
      case Player1326States.ONE_WIN:
        this._values[type] = new Player1326OneWin(player);
        break;
      case Player1326States.TWO_WINS:
        this._values[type] = new Player1326TwoWins(player);
        break;
      case Player1326States.THREE_WINS:
        this._values[type] = new Player1326ThreeWins(player);
        break;
      case Player1326States.NO_WINS:
      default:
        this._values[type] = new Player1326NoWins(player);
    }
    return this._values[type];
  }
}
// Singleton factory
export const STATE_FACTORY = new Player1326StateFactory();

export class Player1326NoWins extends Player1326State {
  constructor(protected _player: Player1326) {
    super(_player);
    this._betMultiplier = 1;
    this._nextStateWin = STATE_FACTORY.get(
      Player1326States.ONE_WIN,
      this._player
    );
  }
}

export class Player1326OneWin extends Player1326State {
  constructor(protected _player: Player1326) {
    super(_player);
    this._betMultiplier = 3;
    this._nextStateWin = STATE_FACTORY.get(
      Player1326States.TWO_WINS,
      this._player
    );
  }
}

export class Player1326TwoWins extends Player1326State {
  constructor(protected _player: Player1326) {
    super(_player);
    this._betMultiplier = 2;
    this._nextStateWin = STATE_FACTORY.get(
      Player1326States.THREE_WINS,
      this._player
    );
  }
}

export class Player1326ThreeWins extends Player1326State {
  constructor(protected _player: Player1326) {
    super(_player);
    this._betMultiplier = 6;
    // handled in parent class to avoid loop instantiation
    this._nextStateWin = undefined;
  }
}
