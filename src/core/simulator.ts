// class Simulator¶
// Simulator exercises the Roulette simulation with a given Player placing bets. It reports raw statistics on a number of sessions of play.

import { Game } from "../roulete";
import { Player } from "../roulete/player";

export class Simulator {
  private _initDuration = 250;
  private _initStake = 100;
  private _samplesCount = 50;

  private _durations: number[] = [];
  private _maxima: number[] = [];

  public get durations() {
    return this._durations;
  }
  public get maxima() {
    return this._maxima;
  }

  constructor(
    private _game: Game,
    private _player: Player
  ) {}

  session() {
    // init player
    this._player.reInit(
      this._initStake * this._game.table.minimum,
      this._initDuration
    );

    const stakes = [];

    try {
      while (this._player.isPlaying()) {
        this._game.cycle(this._player);
        stakes.push(this._player.stake);
      }
    } catch {
      // game stopped due to invalid bet
    }

    return stakes;
  }

  gather() {
    for (let i = 0; i < this._samplesCount; i++) {
      const stakes = this.session();
      this._durations.push(stakes.length);
      this._maxima.push(Math.max(...stakes));
    }
  }
}
