import { Outcome, Table } from "../../core";
import { BETS, BET_NAMES } from "../constants";
import { Wheel } from "../wheel";
import { Martingale } from "./martingale";

export const RED_COUNT = 7;

export class SevenReds extends Martingale {
  private redCount = RED_COUNT;

  constructor(table: Table, wheel: Wheel, stake: number, roundsToGo: number) {
    super(table, wheel, stake, roundsToGo);
  }
  winners(outcomes: Set<Outcome>) {
    if (this.redCount === 0) return;
    if (
      [...outcomes.keys()].some(outcome => outcome.name === BET_NAMES[BETS.RED])
    ) {
      this.redCount--;
    } else {
      this.redCount = RED_COUNT;
    }
  }
  placeBets() {
    if (this.redCount === 0) {
      super.placeBets();
    }
  }
  reInit(stake: number, roundsToGo: number): void {
    super.reInit(stake, roundsToGo);
    this.redCount = RED_COUNT;
  }
}
