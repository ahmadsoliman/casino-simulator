import { Bin } from "../core/bin";
import { WHEEL_SIZE } from "./constants";
import { InvalidBinIndex, InvalidOutcome } from "../core/exceptions";
import { Outcome } from "../core/outcome";
import { chooseRand, rand } from "../utils/rng";

export class Wheel {
  private _bins: Bin[];
  private _rng: () => number; // 0 -> 1
  public allOutcomes: Map<string, Outcome> = new Map();

  constructor(rngSeed?: number) {
    this._bins = [...Array(WHEEL_SIZE)].map(() => new Bin());
    this._rng = rand(rngSeed);
  }

  public get(binIndex: number) {
    if (binIndex < 0 || binIndex >= WHEEL_SIZE) {
      throw new InvalidBinIndex(binIndex);
    }
    return this._bins[binIndex];
  }

  public choose() {
    return this._bins[chooseRand(this._rng, WHEEL_SIZE)];
  }

  private _addOutcomeToAllOutcomes(outcome: Outcome) {
    if (!this.allOutcomes.has(outcome.name)) {
      this.allOutcomes.set(outcome.name, outcome);
    }
  }

  public addOutcome(binIndex: number, outcome: Outcome) {
    if (binIndex < 0 || binIndex >= WHEEL_SIZE) {
      throw new InvalidBinIndex(binIndex);
    }
    this._addOutcomeToAllOutcomes(outcome);
    this._bins[binIndex].add(outcome);
  }

  public getOutcome(name: string) {
    if (this.allOutcomes.get(name)) {
      return this.allOutcomes.get(name)!;
    }
    throw new InvalidOutcome(name);
  }
}
