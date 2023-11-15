import { Bet, Outcome, Table } from "../../core";
import { BETS, BET_NAMES } from "../constants";
import { Player } from "../player";
import { Wheel } from "../wheel";

export class Passenger57 extends Player {
  private black: Outcome;

  constructor(table: Table, wheel: Wheel, stake: number, roundsToGo: number) {
    super(table, wheel, stake, roundsToGo);
    this.black = wheel.getOutcome(BET_NAMES[BETS.BLACK]);
  }
  placeBets() {
    this._table.placeBet(new Bet(this._table.minimum, this.black));
    super.placeBets();
  }
}
