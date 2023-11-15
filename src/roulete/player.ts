import { Bet, Outcome, Table } from "../core";
import { Wheel } from "./wheel";

export abstract class Player {
  constructor(
    protected _table: Table,
    protected _wheel: Wheel,
    public stake: number,
    public roundsToGo: number
  ) {}

  public get table() {
    return this._table;
  }

  placeBets() {
    this.roundsToGo--;
  }

  win(bet: Bet) {
    this.stake += bet.winAmount();
    // console.log(`Won $${bet.winAmount()} for bet: ${bet.toString()}`);
  }
  winners(_outcomes: Set<Outcome>) {
    _outcomes.size;
  }
  lose(bet: Bet) {
    this.stake -= bet.loseAmount();
    // console.log(`Lost $${bet.loseAmount()} for bet: ${bet.toString()}`);
  }
  isPlaying() {
    return this.stake >= this._table.minimum && this.roundsToGo > 0;
  }
  reInit(stake: number, roundsToGo: number) {
    this.stake = stake;
    this.roundsToGo = roundsToGo;
  }
}
