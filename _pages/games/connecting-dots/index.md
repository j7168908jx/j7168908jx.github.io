---
title:  "Connecting Dots"
subtitle: ""
layout: game
---

<div id="canvas-container">
<canvas id="gameCanvas" style="display: none"></canvas>
</div>

## Introduction

Supported players: 2 / 3 / 4 players. (Play with bot is not yet supported.)

Estimated time to play: 2-5 minutes per round.

This is a simple game I adopted from a tiktok video.

Rules: connect the dots to form more triangles to win!

![](game.svg)


- Each player take turns to draw a line between two dots.
- When a player completes a triangle, it can continue to draw one more line until no more triangles are formed. One point is awarded for each triangle formed.
- The game ends when no valid moves (that can earn a point) are left.
- The player with the most points wins.

Line rules:

- Lines can only be drawn between two dots.
- Latter Lines cannot cross each other.

Triangle rules:

- A triangle is formed when three lines connect three dots.
- Valid triangle cannot contain any other existing triangle inside it.


Dots will be marked gray if no valid moves can be made from them.

<button id="start-game"> Click to start the game </button>
<button id="reset-game" style="display: none"> Click to reset the game status </button>


<link rel="stylesheet" href="game.css">
<script type="module" src="game.js"></script>

