import { Bet, Outcome, Table } from "../../../core";
import { BETS, BET_NAMES } from "../../constants";
import { Player } from "../../player";
import { Wheel } from "../../wheel";
import { Player1326NoWins } from "./player1326-states";
import { Player1326State } from "./player1326-state";

export class Player1326 extends Player {
  private _outcome: Outcome;
  private _state: Player1326State;

  public get outcome() {
    return this._outcome;
  }

  public get state() {
    return this._state;
  }

  constructor(table: Table, wheel: Wheel, stake: number, roundsToGo: number) {
    super(table, wheel, stake, roundsToGo);
    this._outcome = wheel.getOutcome(BET_NAMES[BETS.BLACK])!;
    this._state = new Player1326NoWins(this);
  }

  placeBets() {
    this._table.placeBet(this._state.currentBet());
    super.placeBets();
  }
  win(bet: Bet): void {
    super.win(bet);
    this._state = this._state.nextWon();
  }
  lose(bet: Bet): void {
    super.lose(bet);
    this._state = this._state.nextLost();
  }
  reInit(stake: number, roundsToGo: number): void {
    super.reInit(stake, roundsToGo);
    this._state = new Player1326NoWins(this);
  }
}
