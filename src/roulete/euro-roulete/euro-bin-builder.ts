import { Outcome } from "../../core";
import {
  BETS,
  BET_NAMES,
  BET_ODDS,
  BinBuilder,
  PrisonOutcome,
  WHEEL_SIZE,
  Wheel,
} from "..";

export class EuroBinBuilder extends BinBuilder {
  generateStraightBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.STRAIGHT];
    const odds = BET_ODDS[BETS.STRAIGHT];
    wheel.addOutcome(0, new PrisonOutcome(`${name} 0`, odds));
    for (let i = 1; i < WHEEL_SIZE - 1; i++) {
      wheel.addOutcome(i, new Outcome(`${name} ${i}`, odds));
    }
  }
  generateSpecialFiveBet(wheel: Wheel) {
    const name = BET_NAMES[BETS.FIVE];
    const odds = BET_ODDS[BETS.FIVE];
    const outcome = new Outcome(`${name} {0,1,2,3}`, odds);
    for (let i = 0; i < 4; i++) {
      wheel.addOutcome(i, outcome);
    }
  }
}
