import type { Agent } from "./simulation_object/agent.js";
import type { Structure } from "./simulation_object/structure.js";
import type { View } from "./view.js";
import type { Sprite } from "./sprite.js";
import type { Coordinate } from "./geometry.js";

export class Model {
  private structures = new Map<string, Structure>();
  private agents = new Map<string, Agent>();

  private views: View[] = [];

  private static instance?: Model | undefined;

  private constructor() {}
  // Implementation using singleton method
  static getInstance(): Model {
    if (!Model.instance) {
      Model.instance = new Model();
    }
    return Model.instance;
  }


  public nextTick() {
    for (const agent of this.agents.values()) {
      agent.nextTick();
    }

    for (const structure of this.structures.values()) {
      structure.nextTick();
    }
  }
  public notifyAddObject(id: string, location: Coordinate, sprite: Sprite) {
    for (const view of this.views) {
      view.updateSimulationObjectAdded(id, location, sprite);
    }
  }
  public notifyLocationChange(id: string, location: Coordinate) {
    for (const view of this.views) {
      view.updateLocationChanged(id, location);
    }
  }
  public notifySpriteChange(id: string, sprite: Sprite) {
    for (const view of this.views) {
      view.updateSpriteChanged(id, sprite);
    }
  }

  public addAgent(agent: Agent) {
    this.agents.set(agent.id, agent);
    agent.broadcastInitialState();
  }

  public getAgent(id: string): Agent {
    const desiredAgent = this.agents.get(id);

    if (!desiredAgent) throw new Error("Agent not found");
    return desiredAgent;
  }


  public addStructure(structure: Structure) {
    this.structures.set(structure.id, structure);
    structure.broadcastInitialState();
  }


  public attach(view: View) {
    this.views.push(view);
  }
}
