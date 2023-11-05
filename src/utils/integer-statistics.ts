export class IntegerStatistics extends Array<number> {
  sum(fn = (n: number) => n) {
    return this.reduce((pr, cur) => pr + fn(cur), 0);
  }

  mean() {
    return this.sum() / this.length;
  }

  standardDeviation() {
    const mean = this.mean();
    const stdv = Math.sqrt(
      this.sum(cur => Math.pow(cur - mean, 2)) / (this.length - 1)
    );
    return Math.round(stdv * 1000) / 1000;
  }
}
