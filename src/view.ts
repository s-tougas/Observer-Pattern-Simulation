import { assert } from "./assert.js";
import type { Coordinate } from "./geometry.js";
import type { Sprite } from "./sprite.js";

export abstract class View {
  // You may decide whether these methods should be abstract or not,
  // but you may not otherwise modify their signatures.

  abstract updateSimulationObjectAdded(simulationObjectId: string, location: Coordinate, sprite: Sprite): void;

  abstract updateLocationChanged(simulationObjectId: string, location: Coordinate): void;

  updateSpriteChanged(simulationObjectId: string, sprite: Sprite): void {}
}

export class MainSimulationView extends View {
 
  private drawableObjects = new Map<string, DrawableSimulationObject>();

  constructor(private canvas: HTMLCanvasElement) {
    super();
  }


  public draw() {
    for (const drawable of this.drawableObjects.values()) {
      this.canvas.getContext("2d")?.drawImage(
        drawable.getSpriteImage(),
       
        Math.floor(drawable.location.x),
        Math.floor(drawable.location.y),
        Math.floor(drawable.getSpriteImage().width * drawable.getSprite().scale),
        Math.floor(drawable.getSpriteImage().height * drawable.getSprite().scale)
      );
    }
  }
  public updateSimulationObjectAdded(simulationObjectId: string, location: Coordinate, sprite: Sprite): void {
    const drawable = new DrawableSimulationObject(simulationObjectId, location, sprite);
    this.drawableObjects.set(simulationObjectId, drawable);
  }
  public updateLocationChanged(simulationObjectId: string, location: Coordinate): void {
    const drawable = this.drawableObjects.get(simulationObjectId);
    if (drawable !== undefined) {
      drawable.location = location;
    }
  }

  public override updateSpriteChanged(simulatedObjectId: string, sprite: Sprite): void {
    const drawable = this.drawableObjects.get(simulatedObjectId);
    if (drawable !== undefined) {
      drawable.setSprite(sprite);
    }
  }
}
// Stores information needed to draw a simulation object.
class DrawableSimulationObject {
  private loadedImage: HTMLImageElement;

  constructor(public readonly id: string, public location: Coordinate, private sprite: Sprite) {
    this.loadedImage = document.getElementById(sprite.imageID) as HTMLImageElement;
  }

  public getSprite() {
    return this.sprite;
  }
  public getSpriteImage() {
    return this.loadedImage;
  }
  public setSprite(sprite: Sprite) {
    this.sprite = sprite;
    this.loadedImage = document.getElementById(sprite.imageID) as HTMLImageElement;
  }
}
