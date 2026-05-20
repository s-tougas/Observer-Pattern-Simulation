import type { Coordinate } from "../geometry.js";
import { SimulationObject } from "./simulation_object.js";
import { Sprite } from "../sprite.js";
export function structureFactory(type: string, id: string, location: Coordinate): Structure {
  switch (type) {
    case "house":
      return new House(location, id);
    default:
      throw new Error("unsupported structure type: " + type);
  }
}

export abstract class Structure extends SimulationObject {
  constructor(loc: Coordinate, id: string) {
    super(id, loc);
  }
  public override nextTick(): void {}
}
class House extends Structure {
  constructor(loc: Coordinate, id: string) {
    super(loc, id);
  }
  protected getSprite(): Sprite {
    return new Sprite("simpleHouse", 1);
  }
}
