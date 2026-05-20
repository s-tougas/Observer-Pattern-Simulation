# Lobster Simulation — Observer/MVC Pattern

A canvas-based simulation built in TypeScript demonstrating the **Observer pattern** and **MVC architecture**.

## Overview

Lobsters (agents) move across a canvas toward target destinations. A `SleepingLobster` variant falls asleep and changes its sprite upon arrival. A static `House` structure is also rendered.

## Architecture

- **Model** — Singleton that manages agents, structures, and notifies views of state changes
- **View** — Observer that reacts to model updates and renders sprites to an HTML canvas
- **Agents** — `SimpleLobster` and `SleepingLobster`, created via factory function
- **Structures** — `House`, created via factory function

## Tech Stack

TypeScript → compiled to JavaScript. Runs in the browser via a canvas element.

## How to Run

1. Compile TypeScript: `tsc`
2. Open `index.html` in a browser

## Concepts Demonstrated

- Observer / publish-subscribe pattern
- MVC separation of concerns
- Singleton pattern
- Factory pattern
- 2D vector math and linear interpolation

## Attribution

This project was completed as part of a course assignment. 
The following files were provided as starter code and were not written by me:

- `src/assert.ts` — provided by course staff
- `src/geometry.ts` — provided by course staff
- `src/sprite.ts` — provided by course staff
- `public/index.html` — provided by course staff

All other files in `src/` were written by me.
