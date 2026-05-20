import { structureFactory } from "./simulation_object/structure.js";
import { agentFactory } from "./simulation_object/agent.js";
import { Coordinate } from "./geometry.js";
import { Model } from "./model.js";

describe("Starter test", () => {
  test("Minimal Model + House test", () => {
    const location = new Coordinate(42, 42);
    const house = structureFactory("house", "My House", new Coordinate(42, 42));
    expect(house.getLocation()).toEqual(location);

    Model.getInstance().addStructure(house);
  });
  test("Location correctness for agents", () => {
    const location = new Coordinate(50, 50);
    const loc2 = new Coordinate(30, 30);

    const sleepy = agentFactory("sleeping_lobster", "frank", new Coordinate(50, 50));

    const awake = agentFactory("simple_lobster", "frank", new Coordinate(30, 30));
    expect(sleepy.getLocation()).toEqual(location);
    expect(awake.getLocation()).toEqual(loc2);
  });
});
