import { Bet } from "../core/bet";
import { InvalidBet } from "./exceptions";

export class Table {
  private _bets: Bet[]; // bets are unique by outcome

  public get bets(): Bet[] {
    return [...this._bets];
  }

  constructor(
    public minimum = 10,
    public limit = 200,
    bets: Bet[] = []
  ) {
    this._bets = [...bets];
  }

  private _findBet(bet: Bet) {
    return this._bets.findIndex(bet.equals.bind(bet));
  }

  public placeBet(bet: Bet) {
    this.isValid(bet);

    const oldBetIndex = this._findBet(bet);
    if (oldBetIndex > -1) {
      const oldBet = this._bets[oldBetIndex];
      this._bets[oldBetIndex] = new Bet(
        oldBet.amount + bet.amount,
        bet.outcome
      );
    } else {
      this._bets.push(bet);
    }
  }

  public deleteBet(bet: Bet) {
    this._bets = this._bets.filter(cur => !cur.outcome.equals(bet.outcome));
  }

  public isValid(withBet?: Bet) {
    const totalAmount = (withBet ? [...this._bets, withBet] : this._bets)
      .map(bet => {
        if (bet.amount < this.minimum) {
          throw new InvalidBet(
            `The bet's amount: ${bet.amount} is smaller than the table's minimum: ${this.minimum}`
          );
        }
        return bet.amount;
      })
      .reduce((pr, cur) => pr + cur, 0);

    if (totalAmount > this.limit) {
      throw new InvalidBet(
        `The bets total amount: ${totalAmount} is greater than the table's limit: ${this.limit}`
      );
    }
    return true;
  }

  public toString() {
    return "Table bets:\n" + this._bets.map(bet => bet.toString()).join(",\n");
  }
}
