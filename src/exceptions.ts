export class InvalidBet extends Error {}

export class InvalidBinIndex extends Error {
  constructor(binIndex: number) {
    super(`Bin with binIndex: ${binIndex} doesn't exist on Wheel`);
  }
}

export class InvalidOutcome extends Error {
  constructor(outcomeName: string) {
    super(`'${outcomeName}' isn't a correct name of a known Outcome`);
  }
}
