import { Outcome } from "../../core";

export class PrisonOutcome extends Outcome {
  loseAmount(amount: number): number {
    return amount / 2.0;
  }
}
