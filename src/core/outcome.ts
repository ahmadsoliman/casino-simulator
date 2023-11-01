import { hash } from "../utils/";

export class Outcome {
  constructor(
    public name: string,
    public odds: number
  ) {}
  winAmount(amount: number) {
    return amount * this.odds;
  }
  valueOf() {
    return this.name;
  }
  equals(o: Outcome) {
    return o instanceof Outcome && this.valueOf() === o.valueOf();
  }
  hash() {
    return hash(this.name);
  }
  toString() {
    return `${this.name} ${this.odds}:1`;
  }
  repr() {
    return `${Outcome.name}(name='${this.name}', odds=${this.odds})`;
  }
}
