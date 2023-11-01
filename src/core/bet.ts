import { InvalidBet } from "./exceptions";
import { Outcome } from "./outcome";

export class Bet {
  constructor(
    private _amount: number,
    private _outcome: Outcome
  ) {
    if (_amount < 0) {
      throw new InvalidBet("Bet amount can't be less than 0");
    }
  }

  public get amount() {
    return this._amount;
  }
  public get outcome() {
    return this._outcome;
  }

  winAmount() {
    return this._amount + this._outcome.winAmount(this._amount);
  }
  loseAmount() {
    return this._outcome.loseAmount(this._amount);
  }
  toString() {
    return `$${this._amount} on (${this._outcome.toString()})`;
  }
  equals(bet: Bet) {
    return this._outcome.equals(bet._outcome);
  }
}
