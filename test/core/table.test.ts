import { describe, expect, it } from "vitest";
import { Outcome, Bet, Table, InvalidBet } from "../../src";

describe("Table Class", () => {
  it("", () => {
    const o1 = new Outcome("Red", 1);
    const o2 = new Outcome("Black", 17);

    const b1 = new Bet(1500, o1);
    const b2 = new Bet(100, o2);

    const table = new Table(100, 2000, [b1, b2]);

    expect(table.isValid());
    expect(() => table.placeBet(b1)).toThrow(
      new InvalidBet(
        "The bets total amount: 3100 is greater than the table's limit: 2000"
      )
    );
    expect(table.bets).toEqual([b1, b2]);

    table.placeBet(b2);
    expect(table.bets).toEqual([b1, new Bet(200, o2)]);

    table.deleteBet(b2);
    expect(table.bets).toEqual([b1]);

    expect(() => table.placeBet(new Bet(10, o2))).toThrow(
      new InvalidBet(
        "The bet's amount: 10 is smaller than the table's minimum: 100"
      )
    );
  });
});
