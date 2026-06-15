import { Storage } from '/mulheres-cientistas-memory-game/src/storage.js';
import { possibleIcons } from '/mulheres-cientistas-memory-game/src/data/possibleIcons.js';

export class PlayerModel {
  
  static get possibleIcons() {
    return possibleIcons;
  }

  constructor(name) {
    const savedData = Storage.read(`player_${name}`, true);

    if (savedData) {
      this._name = savedData.name;
      this._points = savedData.points ?? 0;
      this._tries = savedData.tries ?? 0;
      this._matches = savedData.matches ?? 0;
      this._iconFaName = savedData.iconFaName;
      this._dirty = false;
    } else {
      this._name = name;
      this._points = 0;
      this._tries = 0;
      this._matches = 0;
      this._iconFaName = this.constructor.possibleIcons[Math.floor(Math.random() * this.constructor.possibleIcons.length)];
      this._dirty = true;
    }
  }

  get name() { return this._name; }
  set name(val) { this._name = val; this._dirty = true; }

  get points() { return this._points; }
  set points(val) { this._points = val; this._dirty = true; }

  get tries() { return this._tries; }
  set tries(val) { this._tries = val; this._dirty = true; }

  get matches() { return this._matches; }
  set matches(val) { this._matches = val; this._dirty = true; }

  get iconFaName() { return this._iconFaName; }
  set iconFaName(val) { this._iconFaName = val; this._dirty = true; }

  changeToRandomIcon() {
    const availableIcons = this.constructor.possibleIcons.filter(icon => icon !== this._iconFaName);
    const randomIndex = Math.floor(Math.random() * availableIcons.length);
    this.iconFaName = availableIcons[randomIndex];
  }

  get dirty() { return this._dirty; }
  set dirty(val) { this._dirty = val; }

  get accuracy() {
    return this._matches / Math.max(1, this._tries);
  }

  static updatePlayer(playerInstance) {
    if (!playerInstance.dirty) return;

    const dataToSave = {
      name: playerInstance.name,
      points: playerInstance.points,
      tries: playerInstance.tries,
      matches: playerInstance.matches,
      iconFaName: playerInstance.iconFaName
    };

    Storage.write(`player_${playerInstance.name}`, dataToSave, true);
    playerInstance.dirty = false;
  }
}
