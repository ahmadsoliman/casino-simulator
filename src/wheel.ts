import { Bin } from "./bin";
import { WHEEL_SIZE } from "./constants";
import { Outcome } from "./outcome";
import { rand } from "./utils/rng";

export class Wheel {
  private _bins: Bin[];
  private _rng: () => number; // 0 -> 1

  constructor(rngSeed?: number) {
    this._bins = [...Array(WHEEL_SIZE)].map(() => new Bin());
    this._rng = rand(rngSeed);
  }

  public get(binIndex: number) {
    if (binIndex < 0 || binIndex >= WHEEL_SIZE) {
      throw `Bin with binIndex: ${binIndex} doesn't exist on Wheel`;
    }
    return this._bins[binIndex];
  }

  public choose() {
    return this._bins[Math.round(this._rng() * (WHEEL_SIZE - 1))];
  }

  public addOutcome(binIndex: number, outcome: Outcome) {
    if (binIndex < 0 || binIndex >= WHEEL_SIZE) {
      throw `Bin with binIndex: ${binIndex} doesn't exist on Wheel`;
    }
    this._bins[binIndex].add(outcome);
  }
}
