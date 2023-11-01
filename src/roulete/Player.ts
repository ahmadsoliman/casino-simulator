import { Bet } from "../core";

export abstract class Player {
  abstract placeBets(): void;

  win(bet: Bet) {
    console.log(`Won $${bet.winAmount()} for bet: ${bet.toString()}`);
  }

  lose(bet: Bet) {
    console.log(`Lost $${bet.loseAmount()} for bet: ${bet.toString()}`);
  }
}
