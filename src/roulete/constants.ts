export const WHEEL_SIZE = 38;
export const DOUBLE_ZERO_INDEX = WHEEL_SIZE - 1;
export const REDS = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
export const BLACKS = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

export enum BETS {
  STRAIGHT,
  SPLIT,
  STREET,
  CORNER,
  FIVE,
  LINE,
  DOZEN,
  COLUMN,
  OUTSIDE, // all six below
  LOW,
  HIGH,
  EVEN,
  ODD,
  RED,
  BLACK,
}
export const BET_NAMES = {
  [BETS.STRAIGHT]: "Straight",
  [BETS.SPLIT]: "Split",
  [BETS.STREET]: "Street",
  [BETS.CORNER]: "Corner",
  [BETS.FIVE]: "Special Five",
  [BETS.LINE]: "Line",
  [BETS.DOZEN]: "Dozen",
  [BETS.COLUMN]: "Column",
  [BETS.LOW]: "Low",
  [BETS.HIGH]: "High",
  [BETS.EVEN]: "Even",
  [BETS.ODD]: "Odd",
  [BETS.RED]: "Red",
  [BETS.BLACK]: "Black",
};
export const BET_ODDS = {
  [BETS.STRAIGHT]: 35,
  [BETS.SPLIT]: 17,
  [BETS.STREET]: 11,
  [BETS.CORNER]: 8,
  [BETS.FIVE]: 6,
  [BETS.LINE]: 5,
  [BETS.DOZEN]: 2,
  [BETS.COLUMN]: 2,
  [BETS.OUTSIDE]: 1,
  [BETS.LOW]: 1,
  [BETS.HIGH]: 1,
  [BETS.EVEN]: 1,
  [BETS.ODD]: 1,
  [BETS.RED]: 1,
  [BETS.BLACK]: 1,
};
