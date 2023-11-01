import { Bet, Outcome, Table } from "../core";
import { Player } from "./player";
import { BETS, BET_NAMES } from "./constants";
import { Wheel } from "./wheel";

export class Passenger57 extends Player {
  private black: Outcome;

  constructor(
    private _table: Table,
    _wheel: Wheel
  ) {
    super();
    this.black = _wheel.getOutcome(BET_NAMES[BETS.BLACK]);
  }

  placeBets() {
    this._table.placeBet(new Bet(100, this.black));
  }
}
