import { assert } from "./assert.js";
import { agentFactory } from "./simulation_object/agent.js";
import { Coordinate } from "./geometry.js";
import { structureFactory } from "./simulation_object/structure.js";
import { MainSimulationView } from "./view.js";
import { Model } from "./model.js";

function main() {
  const canvas = getCanvas();

  
  const view = new MainSimulationView(canvas);
  Model.getInstance().attach(view);
  const lobsters = createLobsters();
 
  for (const lobster of lobsters) {
    Model.getInstance().addAgent(lobster);
  }
  const house = structureFactory("house", "my-house", new Coordinate(0, 0));


  Model.getInstance().addStructure(house);
  setInterval(() => {
    
    Model.getInstance().nextTick();
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

    view.draw();
  }, 100);
}


function getCanvas() {
  const canvas = document.getElementById("simulationCanvas");
  assert(canvas !== null);
  return canvas as HTMLCanvasElement;
}


function createLobsters() {

  const lobst1 = agentFactory("simple_lobster", "lobster1", new Coordinate(300, 400));
  lobst1.startMoving(new Coordinate(750, 50), 10);
  const lobst2 = agentFactory("simple_lobster", "lobster2", new Coordinate(800, 450));
  const lobst3 = agentFactory("sleepy_lobster", "lobster3", new Coordinate(200, 300));
  lobst3.startMoving(new Coordinate(500, 300), 5);
  const lobst4 = agentFactory("sleepy_lobster", "lobster4", new Coordinate(400, 100));
  lobst4.startMoving(new Coordinate(600, 400), 2);

  return [lobst1, lobst2, lobst3, lobst4]; 
}

main();
