import { Bet, Outcome, Table } from "../../core";
import { BETS, BET_NAMES } from "../constants";
import { Player } from "../player";
import { Wheel } from "../wheel";

export class Martingale extends Player {
  private black: Outcome;
  private lossCount = 0;

  public get betMultiple() {
    return Math.pow(2, this.lossCount);
  }

  constructor(table: Table, wheel: Wheel, stake: number, roundsToGo: number) {
    super(table, wheel, stake, roundsToGo);
    this.black = wheel.getOutcome(BET_NAMES[BETS.BLACK]);
  }
  placeBets() {
    this._table.placeBet(
      new Bet(this._table.minimum * this.betMultiple, this.black)
    );
    super.placeBets();
  }
  win(bet: Bet): void {
    super.win(bet);
    this.lossCount = 0;
  }
  lose(bet: Bet): void {
    super.lose(bet);
    this.lossCount++;
  }
  reInit(stake: number, roundsToGo: number): void {
    super.reInit(stake, roundsToGo);
    this.lossCount = 0;
  }
}
