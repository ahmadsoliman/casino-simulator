import { Outcome } from "./outcome";

// Bin is just an Immutable Set of Outcomes
export class Bin extends Set<Outcome> {
  private _existingHashes: Set<number> = new Set();

  constructor(
    ...args: (Outcome | Outcome[] | { [key: string]: Outcome | Outcome[] })[]
  ) {
    super();

    const outcomes = args
      .flat()
      .map(obj => {
        if (obj instanceof Outcome) return obj;
        return Object.values(obj).flat();
      })
      .flat();
    outcomes.forEach(outcome => {
      if (!this._existingHashes.has(outcome.hash())) {
        super.add(outcome);
        this._existingHashes.add(outcome.hash());
      }
    });
  }

  add(outcome: Outcome): this {
    const outcomeHash = outcome.hash();
    if (!this._existingHashes.has(outcomeHash)) {
      super.add(outcome);
      this._existingHashes.add(outcomeHash);
    }
    return this;
  }
  // Immutable Set cann't clear
  clear(): void {}
  // Immutable Set cann't delete
  delete(): boolean {
    return false;
  }
  has(value: Outcome): boolean {
    return this._existingHashes.has(value.hash());
  }

  toArray() {
    return [...this.keys()];
  }
}
