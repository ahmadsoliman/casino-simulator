import { beforeEach, describe, expect, it } from "vitest";
import {
  Outcome,
  Wheel,
  BinBuilder,
  Bin,
  BET_NAMES,
  BETS,
  BET_ODDS,
  WHEEL_SIZE,
  DOUBLE_ZERO_INDEX,
} from "../src";

describe("Bin Builder Class", () => {
  let wheel: Wheel;
  let binBuilder: BinBuilder;

  beforeEach(() => {
    wheel = new Wheel();
    binBuilder = new BinBuilder();
  });

  it("should test straight bet Outcome instances in the Bin objects for positions 0, 00, 1, and 36 on the Wheel.", () => {
    const name = BET_NAMES[BETS.STRAIGHT];
    const odds = BET_ODDS[BETS.STRAIGHT];
    binBuilder.generateStraightBets(wheel);
    expect(wheel.get(0)).toEqual(new Bin(new Outcome(`${name} 0`, odds)));
    expect(wheel.get(WHEEL_SIZE - 1)).toEqual(
      new Bin(new Outcome(`${name} 00`, odds))
    );
    expect(wheel.get(1)).toEqual(new Bin(new Outcome(`${name} 1`, odds)));
    expect(wheel.get(36)).toEqual(new Bin(new Outcome(`${name} 36`, odds)));
  });

  it("should test split bets at positions 1 and 36.", () => {
    // There will be “1-2” and “1-4” Outcome objects in the Bin instance at position 1.
    // Similarly, there will be “33-36” and “35-36” Outcome objects in the Bin instance at position 36.`
    const name = BET_NAMES[BETS.SPLIT];
    const odds = BET_ODDS[BETS.SPLIT];
    binBuilder.generateSplitBets(wheel);
    expect(wheel.get(1)).toEqual(
      new Bin(
        new Outcome(`${name} {1,2}`, odds),
        new Outcome(`${name} {1,4}`, odds)
      )
    );
    expect(wheel.get(36)).toEqual(
      new Bin(
        new Outcome(`${name} {33,36}`, odds),
        new Outcome(`${name} {35,36}`, odds)
      )
    );
  });

  it("should test street bets at positions 1 and 36.", () => {
    const name = BET_NAMES[BETS.STREET];
    const odds = BET_ODDS[BETS.STREET];
    binBuilder.generateStreetBets(wheel);
    expect(wheel.get(1)).toEqual(new Bin(new Outcome(`${name} {1,2,3}`, odds)));
    expect(wheel.get(36)).toEqual(
      new Bin(new Outcome(`${name} {34,35,36}`, odds))
    );
  });

  it("should test corner bets around positions 1, 4, 5, and 46.", () => {
    //Since 1 is on the edge, it’s only part of one corner.
    // 4, however, is part of two corners, and 5 will be part of 4 corner bets.
    const name = BET_NAMES[BETS.CORNER];
    const odds = BET_ODDS[BETS.CORNER];
    binBuilder.generateCornerBets(wheel);
    expect(wheel.get(1)).toEqual(
      new Bin(new Outcome(`${name} {1,2,4,5}`, odds))
    );
    expect(wheel.get(4)).toEqual(
      new Bin(
        new Outcome(`${name} {1,2,4,5}`, odds),
        new Outcome(`${name} {4,5,7,8}`, odds)
      )
    );
    expect(wheel.get(5)).toEqual(
      new Bin(
        new Outcome(`${name} {1,2,4,5}`, odds),
        new Outcome(`${name} {4,5,7,8}`, odds),
        new Outcome(`${name} {5,6,8,9}`, odds),
        new Outcome(`${name} {2,3,5,6}`, odds)
      )
    );
    expect(wheel.get(36)).toEqual(
      new Bin(new Outcome(`${name} {32,33,35,36}`, odds))
    );
  });

  it("should test line bets to be sure that 1 is only in a single line bet, where 4 is part of two separate line bets.", () => {
    const name = BET_NAMES[BETS.LINE];
    const odds = BET_ODDS[BETS.LINE];
    binBuilder.generateLineBets(wheel);
    expect(wheel.get(1)).toEqual(
      new Bin(new Outcome(`${name} {1,2,3,4,5,6}`, odds))
    );
    expect(wheel.get(4)).toEqual(
      new Bin(
        new Outcome(`${name} {1,2,3,4,5,6}`, odds),
        new Outcome(`${name} {4,5,6,7,8,9}`, odds)
      )
    );
    expect(wheel.get(36)).toEqual(
      new Bin(new Outcome(`${name} {31,32,33,34,35,36}`, odds))
    );
  });

  it("should test dozens by checking 1, 17, and 36 for membership in appropriate dozens.", () => {
    const name = BET_NAMES[BETS.DOZEN];
    const odds = BET_ODDS[BETS.DOZEN];
    binBuilder.generateDozenBets(wheel);
    expect(wheel.get(1)).toEqual(new Bin(new Outcome(`${name} {1-12}`, odds)));
    expect(wheel.get(17)).toEqual(
      new Bin(new Outcome(`${name} {13-24}`, odds))
    );
    expect(wheel.get(36)).toEqual(
      new Bin(new Outcome(`${name} {25-36}`, odds))
    );
  });

  it("should test columns by checking 1, 17, and 36 for membership in appropriate columns.", () => {
    const name = BET_NAMES[BETS.COLUMN];
    const odds = BET_ODDS[BETS.COLUMN];
    binBuilder.generateColumnBets(wheel);
    expect(wheel.get(1)).toEqual(new Bin(new Outcome(`${name} 1`, odds)));
    expect(wheel.get(2)).toEqual(new Bin(new Outcome(`${name} 2`, odds)));
    expect(wheel.get(17)).toEqual(new Bin(new Outcome(`${name} 2`, odds)));
    expect(wheel.get(36)).toEqual(new Bin(new Outcome(`${name} 3`, odds)));
  });

  it("Use 1, 17, 18, and 36 to check low, high, red, black, even, and odd outside bets.", () => {
    const low = BET_NAMES[BETS.LOW];
    const high = BET_NAMES[BETS.HIGH];
    const red = BET_NAMES[BETS.RED];
    const black = BET_NAMES[BETS.BLACK];
    const even = BET_NAMES[BETS.EVEN];
    const odd = BET_NAMES[BETS.ODD];
    const outsideOdds = BET_ODDS[BETS.OUTSIDE];
    binBuilder.generateEvenMoneyBets(wheel);
    expect(wheel.get(1)).toEqual(
      new Bin(
        new Outcome(`${low} {1-18}`, outsideOdds),
        new Outcome(`${red}`, outsideOdds),
        new Outcome(`${odd}`, outsideOdds)
      )
    );
    expect(wheel.get(17)).toEqual(
      new Bin(
        new Outcome(`${low} {1-18}`, outsideOdds),
        new Outcome(`${black}`, outsideOdds),
        new Outcome(`${odd}`, outsideOdds)
      )
    );
    expect(wheel.get(18)).toEqual(
      new Bin(
        new Outcome(`${low} {1-18}`, outsideOdds),
        new Outcome(`${red}`, outsideOdds),
        new Outcome(`${even}`, outsideOdds)
      )
    );
    expect(wheel.get(36)).toEqual(
      new Bin(
        new Outcome(`${high} {19-36}`, outsideOdds),
        new Outcome(`${red}`, outsideOdds),
        new Outcome(`${even}`, outsideOdds)
      )
    );
  });

  it("should test confirm that 0 , 1, and 00 participate in the five bet.", () => {
    const name = BET_NAMES[BETS.FIVE];
    const odds = BET_ODDS[BETS.FIVE];
    binBuilder.generateSpecialFiveBet(wheel);
    const fiveBin = new Bin(new Outcome(`${name} {0,00,1,2,3}`, odds));
    expect(wheel.get(0)).toEqual(fiveBin);
    expect(wheel.get(DOUBLE_ZERO_INDEX)).toEqual(fiveBin);
    expect(wheel.get(1)).toEqual(fiveBin);
    expect(wheel.get(4)).not.toEqual(fiveBin);
  });

  it("should test all bins creation.", () => {
    binBuilder.buildBins(wheel);

    const specialFiveOutcome = new Outcome(
      `${BET_NAMES[BETS.FIVE]} {0,00,1,2,3}`,
      BET_ODDS[BETS.FIVE]
    );

    const zeroBin = new Bin(
      specialFiveOutcome,
      new Outcome(`${BET_NAMES[BETS.STRAIGHT]} 0`, BET_ODDS[BETS.STRAIGHT])
    );
    expect(wheel.get(0)).toEqual(zeroBin);

    const doubleZeroBin = new Bin(
      specialFiveOutcome,
      new Outcome(`${BET_NAMES[BETS.STRAIGHT]} 00`, BET_ODDS[BETS.STRAIGHT])
    );
    expect(wheel.get(37)).toEqual(doubleZeroBin);

    const oneBin = new Bin(
      specialFiveOutcome,
      new Outcome(`${BET_NAMES[BETS.STRAIGHT]} 1`, BET_ODDS[BETS.STRAIGHT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {1,2}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {1,4}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.STREET]} {1,2,3}`, BET_ODDS[BETS.STREET]),
      new Outcome(`${BET_NAMES[BETS.CORNER]} {1,2,4,5}`, BET_ODDS[BETS.CORNER]),
      new Outcome(`${BET_NAMES[BETS.LINE]} {1,2,3,4,5,6}`, BET_ODDS[BETS.LINE]),
      new Outcome(`${BET_NAMES[BETS.DOZEN]} {1-12}`, BET_ODDS[BETS.DOZEN]),
      new Outcome(`${BET_NAMES[BETS.COLUMN]} 1`, BET_ODDS[BETS.COLUMN]),
      new Outcome(`${BET_NAMES[BETS.LOW]} {1-18}`, BET_ODDS[BETS.LOW]),
      new Outcome(`${BET_NAMES[BETS.RED]}`, BET_ODDS[BETS.RED]),
      new Outcome(`${BET_NAMES[BETS.ODD]}`, BET_ODDS[BETS.ODD])
    );
    expect(wheel.get(1)).toEqual(oneBin);

    const fiveBin = new Bin(
      new Outcome(`${BET_NAMES[BETS.STRAIGHT]} 5`, BET_ODDS[BETS.STRAIGHT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {4,5}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {2,5}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {5,6}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.SPLIT]} {5,8}`, BET_ODDS[BETS.SPLIT]),
      new Outcome(`${BET_NAMES[BETS.STREET]} {4,5,6}`, BET_ODDS[BETS.STREET]),
      new Outcome(`${BET_NAMES[BETS.CORNER]} {1,2,4,5}`, BET_ODDS[BETS.CORNER]),
      new Outcome(`${BET_NAMES[BETS.CORNER]} {2,3,5,6}`, BET_ODDS[BETS.CORNER]),
      new Outcome(`${BET_NAMES[BETS.CORNER]} {4,5,7,8}`, BET_ODDS[BETS.CORNER]),
      new Outcome(`${BET_NAMES[BETS.CORNER]} {5,6,8,9}`, BET_ODDS[BETS.CORNER]),
      new Outcome(`${BET_NAMES[BETS.LINE]} {1,2,3,4,5,6}`, BET_ODDS[BETS.LINE]),
      new Outcome(`${BET_NAMES[BETS.LINE]} {4,5,6,7,8,9}`, BET_ODDS[BETS.LINE]),
      new Outcome(`${BET_NAMES[BETS.DOZEN]} {1-12}`, BET_ODDS[BETS.DOZEN]),
      new Outcome(`${BET_NAMES[BETS.COLUMN]} 2`, BET_ODDS[BETS.COLUMN]),
      new Outcome(`${BET_NAMES[BETS.LOW]} {1-18}`, BET_ODDS[BETS.LOW]),
      new Outcome(`${BET_NAMES[BETS.RED]}`, BET_ODDS[BETS.RED]),
      new Outcome(`${BET_NAMES[BETS.ODD]}`, BET_ODDS[BETS.ODD])
    );
    expect(wheel.get(5)).toEqual(fiveBin);
  });
});
