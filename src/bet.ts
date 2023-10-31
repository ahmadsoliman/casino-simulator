import { Outcome } from "./outcome";

export class Bet {
  constructor(
    private _amount: number,
    private _outcome: Outcome
  ) {}
  winAmount() {
    return this._amount + this._outcome.winAmount(this._amount);
  }
  loseAmount() {
    return this._amount;
  }
  toString() {
    return `$${this._amount} on (${this._outcome.toString()})`;
  }
}
