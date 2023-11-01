import { Bin } from "../core/bin";
import { WHEEL_SIZE } from "./constants";
import { InvalidBinIndex, InvalidOutcome } from "../core/exceptions";
import { Outcome } from "../core/outcome";
import { rand } from "../utils/rng";

export class Wheel {
  private _bins: Bin[];
  private _rng: () => number; // 0 -> 1
  public allOutcomes: { [key: string]: Outcome } = {};

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
    return this._bins[Math.round(this._rng() * (WHEEL_SIZE - 1))];
  }

  private _addOutcomeToAllOutcomes(outcome: Outcome) {
    if (!this.allOutcomes[outcome.name]) {
      this.allOutcomes[outcome.name] = outcome;
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
    if (this.allOutcomes[name]) {
      return this.allOutcomes[name];
    }
    throw new InvalidOutcome(name);
  }
}
