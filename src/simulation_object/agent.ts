import { Vector2D, type Coordinate } from "../geometry.js";
import { SimulationObject } from "./simulation_object.js";
import { Movement } from "../movement.js";
import { Sprite } from "../sprite.js";
import { Model } from "../model.js";
export function agentFactory(type: string, id: string, initialLocation: Coordinate): Agent {
  switch (type) {
    case "simple_lobster":
      return new SimpleLobster(initialLocation, id);
    case "sleepy_lobster":
    case "sleeping_lobster":
      return new SleepingLobster(initialLocation, id);
    default:
      throw new Error("unsupported agent type: " + type);
  }
}

export abstract class Agent extends SimulationObject {
  // TASK: Decide whether startMoving should be abstract or not.
  protected movement?: Movement | undefined;
  constructor(loc: Coordinate, id: string) {
    super(id, loc);
  }
  public startMoving(destination: Coordinate, speed: number): void {
    this.movement = new Movement(this.getLocation());
    this.movement.setVelocityTowards(destination, speed);
  }

  public override nextTick(): void {
    if (this.movement && this.movement.isMoving()) {
      this.movement.updateLocation();
      this.setLocation(this.movement.getLocation());

      Model.getInstance().notifyLocationChange(this.id, this.getLocation());

      if (!this.movement.isMoving()) {
        this.movement = undefined;
      }
    }
  }
}
class SimpleLobster extends Agent {
  constructor(loc: Coordinate, id: string) {
    super(loc, id);
  }
  protected getSprite(): Sprite {
    return new Sprite("lobsterRegular", 0.4);
  }
}

class SleepingLobster extends SimpleLobster {
  private isAsleep = false;
  private hasMoved = false;
  public override startMoving(destination: Coordinate, speed: number): void {
    if (this.isAsleep) return;

    super.startMoving(destination, speed);
    this.hasMoved = true;
  }

  public override nextTick(): void {
    if (!this.isAsleep) {
      super.nextTick();

      if (this.hasMoved && (!this.movement || !this.movement.isMoving())) {
        this.isAsleep = true;

        Model.getInstance().notifySpriteChange(this.id, this.getSprite());
      }
    }
  }
  protected override getSprite(): Sprite {
    if (this.isAsleep) {
      return new Sprite("lobsterSleeping", 0.25);
    }
    return super.getSprite();
  }
}
