import { Coordinate } from "../geometry.js";
import { Sprite } from "../sprite.js";
import { Model } from "../model.js";
export abstract class SimulationObject {
  private location: Coordinate;

  constructor(public readonly id: string, loc: Coordinate) {
    this.location = loc;
  }
  protected setLocation(loc: Coordinate): void {
    this.location = loc;
  }
  public getLocation(): Coordinate {
    return this.location;
  }

  public abstract nextTick(): void;

  public broadcastInitialState(): void {
    Model.getInstance().notifyAddObject(this.id, this.getLocation(), this.getSprite());
  }
  protected abstract getSprite(): Sprite;
}
