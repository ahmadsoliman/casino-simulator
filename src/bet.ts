import { Outcome } from "./outcome";

export class Bet {
  constructor(
    private amount: number,
    private outcome: Outcome
  ) {}
  winAmount() {
    return this.amount + this.outcome.winAmount(this.amount);
  }
  loseAmount() {
    return this.amount;
  }
  toString() {
    return `$${this.amount} on (${this.outcome.toString()})`;
  }
}
