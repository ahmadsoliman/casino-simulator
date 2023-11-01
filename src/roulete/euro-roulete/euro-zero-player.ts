import { Bet, Outcome, Table } from "../../core";
import { Player } from "../player";
import { BETS, BET_NAMES } from "../constants";
import { Wheel } from "../wheel";

export class EuroZeroPlayer extends Player {
  private zero: Outcome;

  constructor(
    private _table: Table,
    _wheel: Wheel
  ) {
    super();
    this.zero = _wheel.getOutcome(BET_NAMES[BETS.STRAIGHT] + " 0");
  }

  placeBets() {
    this._table.placeBet(new Bet(100, this.zero));
  }
}
