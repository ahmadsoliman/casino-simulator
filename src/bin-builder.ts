import {
  BETS,
  BET_NAMES,
  BET_ODDS,
  DOUBLE_ZERO_INDEX,
  REDS,
  WHEEL_SIZE,
} from "./constants";
import { Outcome } from "./outcome";
import { Wheel } from "./wheel";

export class BinBuilder {
  buildBins(wheel: Wheel) {
    this.generateStraightBets(wheel);
    this.generateSplitBets(wheel);
    this.generateStreetBets(wheel);
    this.generateCornerBets(wheel);
    this.generateLineBets(wheel);
    this.generateDozenBets(wheel);
    this.generateColumnBets(wheel);
    this.generateEvenMoneyBets(wheel);
    this.generateSpecialFiveBet(wheel);
  }
  generateStraightBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.STRAIGHT];
    const odds = BET_ODDS[BETS.STRAIGHT];
    for (let i = 0; i < WHEEL_SIZE - 1; i++) {
      wheel.addOutcome(i, new Outcome(`${name} ${i}`, odds));
    }
    wheel.addOutcome(DOUBLE_ZERO_INDEX, new Outcome(`${name} 00`, odds));
  }
  generateSplitBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.SPLIT];
    const odds = BET_ODDS[BETS.SPLIT];
    function addSplit(x: number, y: number) {
      const outcome = new Outcome(`${name} {${x},${y}}`, odds);
      wheel.addOutcome(x, outcome);
      wheel.addOutcome(y, outcome);
    }
    for (let i = 0; i < 12; i++) {
      addSplit(3 * i + 1, 3 * i + 2);
      addSplit(3 * i + 2, 3 * i + 3);
    }
    for (let i = 0; i < 11; i++) {
      addSplit(3 * i + 1, 3 * i + 4);
      addSplit(3 * i + 2, 3 * i + 5);
      addSplit(3 * i + 3, 3 * i + 6);
    }
  }
  generateStreetBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.STREET];
    const odds = BET_ODDS[BETS.STREET];
    for (let i = 0; i < 12; i++) {
      const n = i * 3 + 1;
      const outcome = new Outcome(`${name} {${n},${n + 1},${n + 2}}`, odds);
      wheel.addOutcome(n, outcome);
      wheel.addOutcome(n + 1, outcome);
      wheel.addOutcome(n + 2, outcome);
    }
  }
  generateCornerBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.CORNER];
    const odds = BET_ODDS[BETS.CORNER];
    function addCorner(n: number) {
      const outcome = new Outcome(
        `${name} {${n},${n + 1},${n + 3},${n + 4}}`,
        odds
      );
      wheel.addOutcome(n, outcome);
      wheel.addOutcome(n + 1, outcome);
      wheel.addOutcome(n + 3, outcome);
      wheel.addOutcome(n + 4, outcome);
    }
    for (let i = 0; i < 11; i++) {
      addCorner(i * 3 + 1);
      addCorner(i * 3 + 2);
    }
  }
  generateLineBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.LINE];
    const odds = BET_ODDS[BETS.LINE];
    for (let i = 0; i < 11; i++) {
      const n = i * 3 + 1;
      const outcome = new Outcome(
        `${name} {${n},${n + 1},${n + 2},${n + 3},${n + 4},${n + 5}}`,
        odds
      );
      wheel.addOutcome(n, outcome);
      wheel.addOutcome(n + 1, outcome);
      wheel.addOutcome(n + 2, outcome);
      wheel.addOutcome(n + 3, outcome);
      wheel.addOutcome(n + 4, outcome);
      wheel.addOutcome(n + 5, outcome);
    }
  }
  generateDozenBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.DOZEN];
    const odds = BET_ODDS[BETS.DOZEN];
    for (let i = 0; i < 3; i++) {
      const outcome = new Outcome(
        `${name} {${12 * i + 1}-${(i + 1) * 12}}`,
        odds
      );
      for (let j = 1; j < 13; j++) {
        wheel.addOutcome(12 * i + j, outcome);
      }
    }
  }
  generateColumnBets(wheel: Wheel) {
    const name = BET_NAMES[BETS.COLUMN];
    const odds = BET_ODDS[BETS.COLUMN];
    for (let i = 1; i < 4; i++) {
      const outcome = new Outcome(`${name} ${i}`, odds);
      for (let j = 0; j < 12; j++) {
        wheel.addOutcome(i + j * 3, outcome);
      }
    }
  }
  generateEvenMoneyBets(wheel: Wheel) {
    const outsideOdds = BET_ODDS[BETS.OUTSIDE];
    const low = BET_NAMES[BETS.LOW];
    const lowOutcome = new Outcome(`${low} {1-18}`, outsideOdds);
    const high = BET_NAMES[BETS.HIGH];
    const highOutcome = new Outcome(`${high} {19-36}`, outsideOdds);
    const red = BET_NAMES[BETS.RED];
    const redOutcome = new Outcome(`${red}`, outsideOdds);
    const black = BET_NAMES[BETS.BLACK];
    const blackOutcome = new Outcome(`${black}`, outsideOdds);
    const even = BET_NAMES[BETS.EVEN];
    const evenOutcome = new Outcome(`${even}`, outsideOdds);
    const odd = BET_NAMES[BETS.ODD];
    const oddOutcome = new Outcome(`${odd}`, outsideOdds);

    for (let i = 1; i < 37; i++) {
      if (i < 19) wheel.addOutcome(i, lowOutcome);
      else wheel.addOutcome(i, highOutcome);
      if (REDS.includes(i)) wheel.addOutcome(i, redOutcome);
      else wheel.addOutcome(i, blackOutcome);
      if (i % 2 === 0) wheel.addOutcome(i, evenOutcome);
      else wheel.addOutcome(i, oddOutcome);
    }
  }
  generateSpecialFiveBet(wheel: Wheel) {
    const name = BET_NAMES[BETS.FIVE];
    const odds = BET_ODDS[BETS.FIVE];
    const outcome = new Outcome(`${name} {0,00,1,2,3}`, odds);
    for (let i = 0; i < 4; i++) {
      wheel.addOutcome(i, outcome);
    }
    wheel.addOutcome(DOUBLE_ZERO_INDEX, outcome);
  }
}
