import { Bet, Table } from "../../core";
import { chooseRand, rand } from "../../utils";
import { Player } from "../player";
import { Wheel } from "../wheel";

export class PlayerRandom extends Player {
  private _rng: () => number;

  constructor(
    table: Table,
    wheel: Wheel,
    stake: number = table.minimum,
    roundsToGo: number = 250,
    seed?: number
  ) {
    super(table, wheel, stake, roundsToGo);
    this._rng = rand(seed);
  }
  placeBets() {
    const outcomeNames = [...this.wheel.allOutcomes.keys()];
    const randomKey = outcomeNames[chooseRand(this._rng, outcomeNames.length)];
    const randomOutcome = this.wheel.allOutcomes.get(randomKey);
    this.table.placeBet(new Bet(this.table.minimum, randomOutcome!));
    super.placeBets();
  }
}
