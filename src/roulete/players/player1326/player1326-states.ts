import { Bet } from "../../../core";
import { Player1326State } from "./player1326-state";

export class Player1326NoWins extends Player1326State {
  currentBet(): Bet {
    return new Bet(this._player.table.minimum, this._player.outcome);
  }

  nextWon(): Player1326State {
    return new Player1326OneWin(this._player);
  }
}

export class Player1326OneWin extends Player1326State {
  currentBet(): Bet {
    return new Bet(3 * this._player.table.minimum, this._player.outcome);
  }

  nextWon(): Player1326State {
    return new Player1326TwoWins(this._player);
  }
}

export class Player1326TwoWins extends Player1326State {
  currentBet(): Bet {
    return new Bet(2 * this._player.table.minimum, this._player.outcome);
  }

  nextWon(): Player1326State {
    return new Player1326ThreeWins(this._player);
  }
}

export class Player1326ThreeWins extends Player1326State {
  currentBet(): Bet {
    return new Bet(6 * this._player.table.minimum, this._player.outcome);
  }

  nextWon(): Player1326State {
    return new Player1326NoWins(this._player);
  }
}
