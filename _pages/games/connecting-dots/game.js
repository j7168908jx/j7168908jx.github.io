document.addEventListener('DOMContentLoaded', function () {
  main();


});


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GameStateEnum = Object.freeze({
  WAITING_FOR_OPTIONS: 0,
  GAME_STARTED: 1,
  GAME_ENDED: 2
});

const gameState = {
  points: [],
  lines: [],
  triangles: [],
  currPlayer: 0,
  numPlayers: 0,
  scores: [],
  gameState: GameStateEnum.WAITING_FOR_OPTIONS,
  scoreboardText: "",
  gameMode: {
    selectedMode: 0,       // 0 to 3
    points: 15,               // 5 to 50
  }
};
const uiState = gameState.gameMode;



// ====================== Game Logic Functions ======================

class BackgroundColor {
  static getBackgroundColor(player) {
    // Return color based on player (4 players at most)
    switch (player) {
      case 0: return 'rgba(255, 30, 0, 0.1)'; // Red
      case 1: return 'rgba(59, 144, 255, 0.1)'; // Blue
      case 2: return 'rgba(0, 228, 68, 0.1)'; // Green
      case 3: return 'rgba(255, 239, 14, 0.1)'; // Yellow
      default: return 'rgba(128, 128, 128, 0.1)'; // Default gray
    }
  }
}

/**
 * Represents a point in 2D space.
 */
class Point {
  /**
   * Creates a new Point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.possible = true; // Indicates if the point can connect to other points
  }

  /**
   * Calculates the Euclidean distance to another point.
   * @param {Point} other - The other point.
   * @returns {number} The distance to the other point.
   */
  distanceTo(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }

  getPointColor() {
    // if it cannot connects to any other point, return gray
    return this.possible ? 'black' : 'rgb(211, 211, 211)';
  }

  updatePossible(allPoints, allLines) {
    if (!this.possible) return false;
    // Check if this point can connect to any other point
    // i.e., a new line can be formed with this point, without crossing any existing lines
    for (let other of allPoints) {
      if (other !== this) {
        // Check if a line between this point and the other point intersects with any existing lines
        const newLine = new Line(this, other, -1); // -1 indicates no owner
        if (newLine.isValid(allLines)) {
          console.log(`Point (${this.x}, ${this.y}) can connect to (${other.x}, ${other.y})`);
          return true; // This point can connect to another point
        }
      }
    }
    console.log(`Point (${this.x}, ${this.y}) cannot connect to any other point`);
    this.possible = false; // No valid connections found
    return false;
  }

  /**
   * Draws the point on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @returns {void}
   */
  draw(ctx) {
    ctx.beginPath();
    let radius = 5;
    ctx.fillStyle = this.getPointColor();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Line {
  constructor(start, end, owner) {
    this.start = start;
    this.end = end;
    this.owner = owner;
  }

  static getLineColor(owner) {
    // Return color based on owner (4 owners at most)
    switch (owner) {
      case 0: return "rgba(255, 30, 0, 0.8)"; // Red
      case 1: return "rgba(59, 144, 255, 0.8)"; // Blue
      case 2: return "rgba(0, 228, 68, 0.8)"; // Green
      case 3: return "rgba(255, 239, 14, 0.8)"; // Yellow
      default: return 'black'; // Default color if no owner
    }
  }

  length() {
    return this.start.distanceTo(this.end);
  }

  intersects(other) {
    // check if two lines are the same
    if (
      (this.start === other.start && this.end === other.end) ||
      (this.start === other.end && this.end === other.start)
    ) {
      return true; // the same lines are considered intersecting
    }
    // Ignore shared endpoints
    if (
      this.start === other.start || this.start === other.end ||
      this.end === other.start || this.end === other.end
    ) {
      return false;
    }

    function ccw(a, b, c) {
      return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
    }

    return (
      ccw(this.start, other.start, other.end) !== ccw(this.end, other.start, other.end) &&
      ccw(this.start, this.end, other.start) !== ccw(this.start, this.end, other.end)
    );
  }

  isValid(allLines) {
    for (let line of allLines) {
      if (this.intersects(line)) {
        return false;
      }
    }
    return true;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = Line.getLineColor(this.owner);
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }

}


class Triangle {
  constructor(p1, p2, p3, owner) {
    this.points = [p1, p2, p3];
    this.owner = owner;
  }

  static getTriangleColor(owner) {
    // Return color based on owner (4 owners at most)
    switch (owner) {
      case 0: return 'rgba(255, 30, 0, 0.2)'; // Red
      case 1: return 'rgba(59, 144, 255, 0.2)'; // Blue
      case 2: return 'rgba(0, 228, 68, 0.2)'; // Green
      case 3: return 'rgba(255, 239, 14, 0.2)'; // Yellow
      default: return 'rgba(128, 128, 128, 0.2)'; // Default gray
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.lineTo(this.points[2].x, this.points[2].y);
    ctx.closePath();
    ctx.fillStyle = Triangle.getTriangleColor(this.owner);
    ctx.fill();
  }
}



function isLineValid() {

}

function generatePoints(count, width, height) {
  const points = [];
  const minDist = 15; // Minimum distance between points
  let generated = 0;

  while (generated < count) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const newPoint = new Point(x, y);

    // Check if too close to any existing point
    let tooClose = false;
    for (let p of points) {
      if (newPoint.distanceTo(p) < minDist) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) {
      points.push(newPoint);
      generated++;
    }
    // Optional: prevent infinite loop if canvas is too small for the number of points
    if (generated < count && points.length > count * 10) {
      console.warn('Too many points generated, canvas may be too small for the number of points requested.');
      break;
    }
  }

  return points;
}

function initGameData() {
  // set nplayers and pts
  gameState.numPlayers = Math.max(2, uiState.selectedMode + 1); // 0: 2 players, 1: 2 players, 2: 3 players, 3: 4 players

  // get game area and score area
  const numPlayers = gameState.numPlayers;
  const scoreHeight = 30;   // scoreboard height
  const width = canvas.width - 20;
  const height = canvas.height - scoreHeight - 20; // 10px for margin

  // generate uniform randomly distributed points over the canvas
  const numPoints = uiState.points;
  gameState.points = generatePoints(numPoints, width, height);
  // shift pts down
  gameState.points.forEach(point => {
    point.x += 10; // add left margin
    point.y += scoreHeight + 10; // add top margin
  });


  // clear lines
  gameState.lines = [];

  // clear triangles
  gameState.triangles = [];

  // randomly assign a player to start
  gameState.currPlayer = Math.floor(Math.random() * numPlayers);

  // reset scores to zeros
  gameState.scores = Array.from({ length: numPlayers }, () => 0);

}



// ====================== Drawing Functions ======================
const buttonRects = [];
const buttonLabels = ['Play vs Bot', '2 Players', '3 Players', '4 Players'];
const sliderRect = {};
const startButtonRect = {};
const gameOverButtonRect = {};


function drawModeButtons() {
  buttonRects.length = 0;

  const minDim = Math.min(canvas.width, canvas.height);
  const buttonWidth = Math.max(120, minDim * 0.18);
  const buttonHeight = Math.max(50, minDim * 0.1);
  const spacingX = buttonWidth * 0.15;
  const totalWidth = buttonLabels.length * buttonWidth + (buttonLabels.length - 1) * spacingX;
  const startX = (canvas.width - totalWidth) / 2;
  const topY = canvas.height * 0.25;
  const borderRadius = Math.min(20, buttonHeight * 0.3);

  ctx.font = `bold ${Math.max(16, buttonHeight * 0.3)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  buttonLabels.forEach((label, i) => {
    const x = startX + i * (buttonWidth + spacingX);
    const y = topY;

    // Save for interactivity
    buttonRects.push({ x, y, width: buttonWidth, height: buttonHeight });

    ctx.fillStyle = (uiState.selectedMode === i) ? '#ffe066' : '#fff';
    drawRoundedRect(x, y, buttonWidth, buttonHeight, borderRadius);
    ctx.fillStyle = '#333';
    ctx.fillText(label, x + buttonWidth / 2, y + buttonHeight / 2);
  });
}

function drawSlider() {
  const minDim = Math.min(canvas.width, canvas.height);
  const sliderY = canvas.height * 0.25 + Math.max(50, minDim * 0.1) + 60;
  const sliderWidth = canvas.width * 0.6;
  const sliderHeight = 8;
  const sliderX = (canvas.width - sliderWidth) / 2;

  // Save rect
  Object.assign(sliderRect, { x: sliderX, y: sliderY, width: sliderWidth, height: sliderHeight });

  const sliderMin = 5;
  const sliderMax = 50;
  const value = uiState.points;
  const thumbX = sliderX + ((value - sliderMin) / (sliderMax - sliderMin)) * sliderWidth;

  // Draw track
  ctx.fillStyle = '#ccc';
  ctx.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);

  // Draw thumb
  ctx.beginPath();
  ctx.arc(thumbX, sliderY + sliderHeight / 2, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#555';
  ctx.fill();

  // Label
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(14, sliderHeight * 2)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`Points: ${value}`, canvas.width / 2, sliderY - 10);
}

function drawStartButton() {
  const btnWidth = Math.max(140, canvas.width * 0.25);
  const btnHeight = Math.max(50, canvas.height * 0.07);
  const x = (canvas.width - btnWidth) / 2;
  const y = canvas.height - btnHeight - 40;
  const borderRadius = Math.min(20, btnHeight * 0.3);

  // Save for click detection
  Object.assign(startButtonRect, { x, y, width: btnWidth, height: btnHeight });

  ctx.fillStyle = '#fff';
  drawRoundedRect(x, y, btnWidth, btnHeight, borderRadius);

  ctx.fillStyle = '#333';
  ctx.font = `bold ${Math.max(16, btnHeight * 0.4)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Start', canvas.width / 2, y + btnHeight / 2);
}

function drawRoundedRect(x, y, width, height, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function drawStartOption() {
  ctx.fillStyle = 'rgba(77, 77, 77, 0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawModeButtons();
  drawSlider();
  drawStartButton();
}

function drawGameOverOverlay() {
  // Shade the whole canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. "Game Over" text
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(28, canvas.height * 0.05)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height * 0.3);

  // 3. Restart button
  const btnWidth = Math.max(160, canvas.width * 0.25);
  const btnHeight = Math.max(50, canvas.height * 0.07);
  const x = (canvas.width - btnWidth) / 2;
  const y = canvas.height * 0.5;
  const borderRadius = Math.min(20, btnHeight * 0.3);

  // Save for click detection
  Object.assign(gameOverButtonRect, { x, y, width: btnWidth, height: btnHeight });

  // Button background
  ctx.fillStyle = '#fff';
  drawRoundedRect(x, y, btnWidth, btnHeight, borderRadius);

  // Button text
  ctx.fillStyle = '#333';
  ctx.font = `bold ${Math.max(16, btnHeight * 0.4)}px sans-serif`;
  ctx.fillText('Restart', canvas.width / 2, y + btnHeight / 2);
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState.gameState === GameStateEnum.WAITING_FOR_OPTIONS) {
    drawStartOption();
    return;
  }

  // draw game elements
  // Draw lines
  gameState.lines.forEach(line => {
    line.draw(ctx);
  });

  // Draw triangles
  gameState.triangles.forEach(triangle => {
    triangle.draw(ctx);
  });

  // Draw points
  gameState.points.forEach(point => {
    point.draw(ctx);
  });

  // Scores Text
  drawScoreboardText();

  if (gameState.gameState === GameStateEnum.GAME_ENDED) {
    drawGameOverOverlay();
    return;
  }

}

function drawScoreboardText() {
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const y = 10;
  const numPlayers = gameState.numPlayers;
  const currPlayer = gameState.currPlayer;

  const prefix = `${numPlayers} Players - Current Player: `;
  const currPlayerText = `${currPlayer + 1}`;
  const suffix = ' | Score: ';
  const slash = ' / ';

  // Precompute width of all elements
  let totalWidth = ctx.measureText(prefix).width;
  totalWidth += ctx.measureText(currPlayerText).width;
  totalWidth += ctx.measureText(suffix).width;

  for (let i = 0; i < numPlayers; i++) {
    totalWidth += ctx.measureText(`${gameState.scores[i]}`).width;
    if (i < numPlayers - 1) {
      totalWidth += ctx.measureText(slash).width;
    }
  }

  let x = (canvas.width - totalWidth) / 2;

  const bgColor = BackgroundColor.getBackgroundColor(currPlayer);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, y + 20);

  // Draw prefix
  ctx.fillStyle = 'black';
  ctx.fillText(prefix, x, y);
  x += ctx.measureText(prefix).width;

  // Draw current player number in color
  ctx.fillStyle = Line.getLineColor(currPlayer);
  ctx.fillText(currPlayerText, x, y);
  x += ctx.measureText(currPlayerText).width;

  // Draw suffix
  ctx.fillStyle = 'black';
  ctx.fillText(suffix, x, y);
  x += ctx.measureText(suffix).width;

  // Draw scores per player
  for (let i = 0; i < numPlayers; i++) {
    const scoreText = `${gameState.scores[i]}`;
    ctx.fillStyle = Line.getLineColor(i);
    ctx.fillText(scoreText, x, y);
    x += ctx.measureText(scoreText).width;

    if (i < numPlayers - 1) {
      ctx.fillStyle = 'black';
      ctx.fillText(slash, x, y);
      x += ctx.measureText(slash).width;
    }
  }
}

function drawDraggingLine(startPoint, currentMousePos) {

  // Draw the dragging line
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentMousePos.x, currentMousePos.y);
  ctx.strokeStyle = Line.getLineColor(gameState.currPlayer);

  if (!isValidMove) {
    ctx.setLineDash([6, 4]);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}


function resizeCanvas() {
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

  console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
}


// ======================= Controller Functions ======================
let isSliderMouseDown = false;

function updateSliderValueFromX(x) {
  const slider = sliderRect;
  const percent = Math.max(0, Math.min(1, (x - slider.x) / slider.width));
  const newValue = Math.round(5 + percent * (50 - 5));
  if (uiState.points !== newValue) {
    uiState.points = newValue;
    draw();
  }
}

function handleMouseDownStarting(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Check game mode buttons
  for (let i = 0; i < buttonRects.length; i++) {
    const { x: bx, y: by, width, height } = buttonRects[i];
    if (x >= bx && x <= bx + width && y >= by && y <= by + height) {
      uiState.selectedMode = i;
      draw();
      return;
    }
  }

  // Check slider interaction
  const slider = sliderRect;
  if (
    y >= slider.y - 10 && y <= slider.y + slider.height + 10 &&
    x >= slider.x && x <= slider.x + slider.width
  ) {
    isSliderMouseDown = true;
    updateSliderValueFromX(x);
    return;
  }

  // Check Start button
  const start = startButtonRect;
  if (
    x >= start.x && x <= start.x + start.width &&
    y >= start.y && y <= start.y + start.height
  ) {
    startGame();
  }
}

function handleMouseMoveStarting(e) {
  if (!isSliderMouseDown) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;

  updateSliderValueFromX(x);
}

let startPoint = null;
let currentMousePos = null;
let isSnapped = false;
let isValidMove = false;
let isGameMouseDown = false;

function handleMouseDownGame(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let p of gameState.points) {
    if (p.distanceTo(new Point(x, y)) <= 8) {
      startPoint = p;
      currentMousePos = p;
      isGameMouseDown = true;
      break;
    }
  }
}

function handleMouseMoveGame(e) {
  if (!isGameMouseDown || !startPoint) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Try to snap to a real point
  let snapped = null;
  for (let p of gameState.points) {
    if (p !== startPoint && p.distanceTo(new Point(x, y)) <= 8) {
      snapped = p;
      break;
    }
  }

  if (snapped) {
    currentMousePos = snapped;
    // Check if line from startPoint to snapped is valid
  } else {
    currentMousePos = new Point(x, y);
  }
  isSnapped = (snapped !== null);

  const newLine = new Line(startPoint, currentMousePos, gameState.currPlayer);
  isValidMove = newLine.isValid(gameState.lines);

  draw();
  drawDraggingLine(startPoint, currentMousePos);

}


function handleMouseUp(e) {
  if (gameState.gameState === GameStateEnum.WAITING_FOR_OPTIONS) {
    handleMouseUpStarting(e);
  } else if (gameState.gameState === GameStateEnum.GAME_STARTED) {
    handleMouseUpGame(e);
  }
}

function handleMouseUpStarting(e) {
  isSliderMouseDown = false;
}

function handleMouseUpGame(e) {
  if (!isGameMouseDown || !startPoint) return;

  isGameMouseDown = false;

  // Only allow saving if we actually snapped to a valid point
  if (
    currentMousePos instanceof Point &&
    currentMousePos !== startPoint &&
    isValidMove && isSnapped
  ) {
    // Confirm the snap is to a valid endpoint
    const endPoint = currentMousePos;

    // Create and save the line
    const newLine = new Line(startPoint, endPoint, gameState.currPlayer);
    gameState.lines.push(newLine);

    // update the points' possible status
    for (let point of gameState.points) {
      point.updatePossible(gameState.points, gameState.lines);
    }

    // check if valid triangle can be formed
    let found = detectTriangles(newLine);
    console.log(`Triangle found: ${found}`);

    // Advance to the next player (optional logic)
    if (!found) {
      gameState.currPlayer = (gameState.currPlayer + 1) % gameState.numPlayers;
    }

    // check if game is over
    if (checkGameOver()) {
      gameState.gameState = GameStateEnum.GAME_ENDED;
    }
  }

  // Reset drag state
  startPoint = null;
  currentMousePos = null;
  isValidMove = false;
  isSnapped = false;

  draw();
}

function detectTriangles(newLine) {
  // two ends of the new line is ensured to be valid
  const p1 = newLine.start;
  const p2 = newLine.end;
  const owner = newLine.owner;

  // Check all existing lines to see if they can form a triangle with the new line
  // consider all owner's line can be used, no need to check the owner
  for (let line of gameState.lines) {
    if (line !== newLine && (line.start === p1 || line.start === p2 || line.end === p1 || line.end === p2)) {
      // We have a candidate line that shares an endpoint with the new line
      // find the missing line start and end
      let otherPoint = (line.start === p1 || line.start === p2) ? line.end : line.start;
      let sharedPoint = (otherPoint === line.start) ? line.end : line.start;
      let otherPoint2 = (sharedPoint === p1) ? p2 : p1;

      // Check if line otherpoint to otherPoint2 already exists
      let exists = false;
      for (let existingLine of gameState.lines) {
        if (
          (existingLine.start === otherPoint && existingLine.end === otherPoint2) ||
          (existingLine.start === otherPoint2 && existingLine.end === otherPoint)
        ) {
          exists = true;
          break;
        }
      }
      if (exists) {
        // we can form a triangle
        const triangle = new Triangle(sharedPoint, otherPoint, otherPoint2, owner);
        gameState.triangles.push(triangle);
        // Update scores
        gameState.scores[owner] += 1;
        return true; // Found a triangle
      }
    }
  }
  return false; // No triangle found
}

function handleMouseDownGameOver(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Check if the click is within the game over button
  const gameOverButton = gameOverButtonRect;
  if (
    x >= gameOverButton.x && x <= gameOverButton.x + gameOverButton.width &&
    y >= gameOverButton.y && y <= gameOverButton.y + gameOverButton.height
  ) {
    // Reset the game state to start a new game
    gameState.gameState = GameStateEnum.WAITING_FOR_OPTIONS;
    initGameData();
    draw();
  }
}

function handleMouseDown(e) {
  if (gameState.gameState === GameStateEnum.WAITING_FOR_OPTIONS) {
    handleMouseDownStarting(e);
  } else if (gameState.gameState === GameStateEnum.GAME_STARTED) {
    handleMouseDownGame(e);
  } else if (gameState.gameState === GameStateEnum.GAME_ENDED) {
    handleMouseDownGameOver(e);
  }
}

function handleMouseMove(e) {
  if (gameState.gameState === GameStateEnum.WAITING_FOR_OPTIONS) {
    handleMouseMoveStarting(e);
  } else if (gameState.gameState === GameStateEnum.GAME_STARTED) {
    handleMouseMoveGame(e);
  }
}

function checkGameOver() {
  // true if all points are not possible anymore
  return gameState.points.every(point => !point.possible);
}

function gameLoop() {

  requestAnimationFrame(gameLoop);
}

function startGame() {
  // set gamemode to start
  gameState.gameState = GameStateEnum.GAME_STARTED;
  initGameData();
  draw();

}

// Global listener to stop dragging on mouse up
window.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);

function main() {
  resizeCanvas();
  // Add listener for resize
  window.addEventListener('resize', resizeCanvas);
  initGameData();
  draw();
  gameLoop();
}


