import { Bet, Outcome, Table } from "../../core";
import { Player } from "../player";
import { BETS, BET_NAMES } from "../constants";
import { Wheel } from "../wheel";

export class EuroZeroPlayer extends Player {
  private zero: Outcome;

  constructor(table: Table, wheel: Wheel, stake: number, roundsToGo: number) {
    super(table, wheel, stake, roundsToGo);
    this.zero = wheel.getOutcome(BET_NAMES[BETS.STRAIGHT] + " 0");
  }

  placeBets() {
    this._table.placeBet(new Bet(100, this.zero));
    super.placeBets();
  }
}
