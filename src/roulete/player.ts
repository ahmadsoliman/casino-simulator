import { Bet, Outcome, Table } from "../core";
import { Wheel } from "./wheel";

export abstract class Player {
  constructor(
    protected table: Table,
    protected wheel: Wheel,
    public stake: number,
    public roundsToGo: number
  ) {}

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
    return this.stake >= this.table.minimum && this.roundsToGo > 0;
  }
  reInit(stake: number, roundsToGo: number) {
    this.stake = stake;
    this.roundsToGo = roundsToGo;
  }
}
