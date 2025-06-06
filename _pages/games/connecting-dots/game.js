import { PointBase, LineBase, TriangleBase } from '../math/common.js'

document.addEventListener('DOMContentLoaded', function () {
  main();
});

function mylog(message) {
  if (typeof console !== 'undefined' && console.log) {
    // console.log(message);
  }
}

function myerror(message) {
  if (typeof console !== 'undefined' && console.error) {
    console.error(message);
  }
}

const COLORS = {
  PLAYERS: [
    'rgba(255, 30, 0, 0.8)',
    'rgba(59, 144, 255, 0.8)',
    'rgba(0, 228, 68, 0.8)',
    'rgba(235, 208, 0, 0.8)'
  ],
  BACKGROUNDS: [
    'rgba(255, 30, 0, 0.1)',
    'rgba(59, 144, 255, 0.1)',
    'rgba(0, 228, 68, 0.1)',
    'rgba(235, 208, 0, 0.1)'
  ],
  TRIANGLES: [
    'rgba(255, 30, 0, 0.2)',
    'rgba(59, 144, 255, 0.2)',
    'rgba(0, 228, 68, 0.2)',
    'rgba(255, 239, 14, 0.2)'
  ],
  DEFAULT: 'black',
  DISABLED: 'rgb(211, 211, 211)',
  GRAY: 'rgba(128, 128, 128, 0.1)',
  STARTUP_BACKGROUND: 'rgba(177, 77, 77, 0.6)',
  SHADOW: 'rgba(0, 0, 0, 0.5)',
};

class Color {
  static getBackgroundColor(player) {
    // Return color based on player (4 players at most)
    return COLORS.BACKGROUNDS[player] || COLORS.GRAY;
  }

  static getPointColor(isDisabled) {
    // Return color based on whether the point is disabled or not
    return isDisabled ? COLORS.DISABLED : COLORS.DEFAULT;
  }

  static getLineColor(player) {
    return COLORS.PLAYERS[player] || COLORS.DEFAULT;
  }

  static getTriangleColor(player) {
    return COLORS.TRIANGLES[player] || COLORS.GRAY;
  }

}


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SNAP_DISTANCE = 15; // Distance to snap to a point
const PTS_MIN = 5;  // Minimum number of points in the game
const PTS_MAX = 50;

const DIMS = {
  SCORE_HEIGHT: 30,
  MARGIN: 20,
  POINT_RADIUS: 5,
  THUMB_RADIUS: 10
};

const GAME_STATE = Object.freeze({
  WAITING_FOR_OPTIONS: 0,
  GAME_STARTED: 1,
  GAME_ENDED: 2
});


const buttonLabelLonger = ['Play vs Bot', '2 Players', '3 Players', '4 Players'];
const buttonLabelShorter = ['Bot', '2P', '3P', '4P'];


// ====================== GLOBAL STATE ======================

const gameState = {
  /** @type {Point[]} */
  points: [],
  /** @type {Line[]} */
  lines: [],
  /** @type {Triangle[]} */
  triangles: [],
  currPlayer: 0,
  numPlayers: 0,
  /** @type {number[]} */
  scores: [],
  gameState: GAME_STATE.WAITING_FOR_OPTIONS,
  scoreboardText: "",
  gameMode: {
    selectedMode: 1,          // 0 to 3
    points: 15,               // 5 to 50
  }
};

const ui = {
  /** @type {ButtonArea[]} */
  buttonRects: [],
  sliderRect: null,
  startButtonRect: null,
  gameOverButtonRect: null,
  backButtonRect: null,
};


class ButtonArea {
  // canvas coordinates
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(x, y) {
    return (
      x >= this.x && x <= this.x + this.width &&
      y >= this.y && y <= this.y + this.height
    );
  }

  draw(ctx, borderRoundRadius = 10, fillStyle = "#fff") {
    const { x, y, width, height } = this;
    const r = borderRoundRadius;
    ctx.fillStyle = fillStyle;
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
}

// ====================== Game Logic Classes ======================

class Point extends PointBase {
  constructor(x, y) {
    super(x, y);
    this.possible = true; // Indicates if the point can connect to other points
    this.safe = false; // Indicates if the point is inside a triangle
    this.possibleWithoutSafe = true; // Indicates if the point can connect to other points that are not inside any triangle
  }

  updateSafe(allTriangles) {
    if (!this.safe) {
      this.safe = allTriangles.some(triangle => triangle.strictlyContains(this));
      mylog(`Point (${this.x}, ${this.y}) is now safe? ${this.safe}`);
    }
  }

  updatePossible(allPoints, allLines) {
    if (!this.possible) return;  // impossible point can be ignored

    // Check if this point can connect to any other point
    // i.e., a new line can be formed with this point, without crossing any existing lines
    let stillPossible = false;
    let stillPossibleWithoutSafe = false;

    for (let other of allPoints) {
      if (other.equals(this)) continue;

      const newLine = new Line(this, other, -1);
      const valid = newLine.isValid(allLines);

      if (!valid) continue;

      if (!stillPossible) {
        mylog(`Point (${this.x}, ${this.y}) can connect to (${other.x}, ${other.y}), still possible`);
        stillPossible = true;
      }

      if (!other.safe) {
        stillPossibleWithoutSafe = true;
        break; // Stronger condition met; no need to continue
      }
    }

    if (!stillPossible) {
      mylog(`Point (${this.x}, ${this.y}) cannot connect to any other point`);
    }

    this.possible = stillPossible;
    this.possibleWithoutSafe = stillPossibleWithoutSafe;
  }

  draw(ctx) {
    const pointColor = Color.getPointColor(!this.possible)
    super.draw(ctx, DIMS.POINT_RADIUS, pointColor);
  }
}

class Line extends LineBase {
  constructor(start, end, owner) {
    super(start, end);
    this.owner = owner;
    this.dashed = false;
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
    const lineColor = Color.getLineColor(this.owner);
    const dashStyle = this.dashed ? [6, 4] : []; // Dashed if not valid
    super.draw(ctx, lineColor, dashStyle);
  }
}

class Triangle extends TriangleBase {
  constructor(p1, p2, p3, owner) {
    super(p1, p2, p3);
    this.owner = owner;
  }

  isValid(allTriangles) {
    // Check if the triangle overlaps with any existing triangles
    for (let triangle of allTriangles) {
      if (this.intersects(triangle)) {
        return false;
      }
    }
    return true;
  }

  draw(ctx) {
    const fillColor = Color.getTriangleColor(this.owner);
    super.draw(ctx, fillColor);
  }
}


// ====================== Game Logic Functions  ======================


function generatePoints(count, width, height) {
  const points = [];
  const MIN_DISTANCE_BETWEEN_POINTS = 30; // Minimum distance between points

  // note: this cannot solve all too close cases, but no good idea for now
  const MIN_DIST_FROM_LINES = 30; // Minimum distance between pts and any lines
  let generated = 0;

  while (generated < count) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const newPoint = new Point(x, y);

    // Check if too close to any existing point
    let tooClose = false;
    for (let p of points) {
      if (newPoint.distanceTo(p) < MIN_DISTANCE_BETWEEN_POINTS) {
        tooClose = true;
        break;
      }
    }

    for (let i = 0; (i < points.length) && !tooClose; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (newPoint.distanceToLineSegment(points[i], points[j]) < MIN_DIST_FROM_LINES) {
          tooClose = true;
          break;
        }
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
  const numPlayers = Math.max(2, gameState.gameMode.selectedMode + 1); // 0: 2 players, 1: 2 players, 2: 3 players, 3: 4 players
  gameState.numPlayers = numPlayers;

  // get game area and score area
  const width = canvas.width - 2 * DIMS.MARGIN;
  const height = canvas.height - DIMS.SCORE_HEIGHT - 2 * DIMS.MARGIN;

  // generate uniform randomly distributed points over the canvas
  const numPoints = gameState.gameMode.points;
  gameState.points = generatePoints(numPoints, width, height);
  // shift pts right and down for margin
  gameState.points.forEach(point => {
    point.x += DIMS.MARGIN;
    point.y += DIMS.MARGIN + DIMS.SCORE_HEIGHT;
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

function drawBackButton() {
  const buttonWidth = Math.max(Math.min(30, canvas.width * 0.1), 40);
  const buttonHeight = 17;
  const x = 20; // Top left corner with some padding
  const y = 6;
  const borderRadius = Math.min(20, buttonHeight * 0.3);

  // Save for interactivity
  // Object.assign(ui.backButtonRect, { x, y, width: buttonWidth, height: buttonHeight });
  ui.backButtonRect = new ButtonArea(x, y, buttonWidth, buttonHeight);
  ui.backButtonRect.draw(ctx, borderRadius, "#fff");

  ctx.fillStyle = '#333';
  ctx.font = getFontString(Math.max(16, buttonHeight * 0.4));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('<', x + buttonWidth / 2, y + buttonHeight / 2);
}

function drawModeButtons() {
  ui.buttonRects.length = 0;

  const minDim = Math.min(canvas.width, canvas.height);
  const buttonWidth = Math.max(50, minDim * 0.4);
  const buttonHeight = Math.max(50, minDim * 0.1);
  const spacingX = buttonWidth * 0.15;
  const spacingY = buttonHeight * 0.2;

  const buttonLabels = canvas.width < 300 ? buttonLabelShorter : buttonLabelLonger;
  // Calculate grid dimensions
  const cols = 2;
  const rows = Math.ceil(buttonLabels.length / cols);

  // Calculate total grid size
  const totalWidth = cols * buttonWidth + (cols - 1) * spacingX;
  const totalHeight = rows * buttonHeight + (rows - 1) * spacingY;

  // Center the grid
  const startX = (canvas.width - totalWidth) / 2;
  const startY = canvas.height * 0.25;

  const borderRadius = Math.min(20, buttonHeight * 0.3);

  ctx.font = getFontString(Math.max(16, buttonHeight * 0.3));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  buttonLabels.forEach((label, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = startX + col * (buttonWidth + spacingX);
    const y = startY + row * (buttonHeight + spacingY);

    // Save for interactivity
    const btn = new ButtonArea(x, y, buttonWidth, buttonHeight);
    ui.buttonRects.push(btn);

    const currentSelected = gameState.gameMode.selectedMode;
    const fillStyle = (currentSelected === i) ? '#ffe066' : '#fff';
    btn.draw(ctx, borderRadius, fillStyle);

    ctx.fillStyle = '#333';
    ctx.fillText(label, x + buttonWidth / 2, y + buttonHeight / 2);
  });
}

function drawSlider() {
  const minDim = Math.min(canvas.width, canvas.height);
  const sliderY = canvas.height * 0.5 + Math.max(50, minDim * 0.1) + 60;
  const sliderWidth = canvas.width * 0.6;
  const sliderHeight = 8;
  const sliderX = (canvas.width - sliderWidth) / 2;

  // enlarge the reacting area of slider 10px on each side
  ui.sliderRect = new ButtonArea(sliderX, sliderY - 10, sliderWidth, sliderHeight + 20);

  const npoints = gameState.gameMode.points;
  const thumbX = sliderX + ((npoints - PTS_MIN) / (PTS_MAX - PTS_MIN)) * sliderWidth;

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
  ctx.font = getFontString(Math.max(14, sliderHeight * 2));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`Points: ${npoints}`, canvas.width / 2, sliderY - 10);
}

function drawStartButton() {
  const btnWidth = Math.max(70, canvas.width * 0.4);
  const btnHeight = Math.max(50, canvas.height * 0.07);
  const x = (canvas.width - btnWidth) / 2;
  const y = canvas.height - btnHeight - 40;
  const borderRadius = Math.min(20, btnHeight * 0.3);

  // Save for click detection
  ui.startButtonRect = new ButtonArea(x, y, btnWidth, btnHeight);
  ui.startButtonRect.draw(ctx, borderRadius, "#fff");

  ctx.fillStyle = '#333';
  ctx.font = getFontString(Math.max(16, btnHeight * 0.4));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Start', canvas.width / 2, y + btnHeight / 2);
}

function drawStartOption() {
  ctx.fillStyle = COLORS.STARTUP_BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawModeButtons();
  drawSlider();
  drawStartButton();
}

function drawGameOverOverlay() {
  // Shade the whole canvas
  ctx.fillStyle = COLORS.SHADOW;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. "Game Over" text
  ctx.fillStyle = '#fff';
  ctx.font = getFontString(Math.max(28, canvas.height * 0.05));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height * 0.3);

  // player who wins
  // const winner = gameState.scores.indexOf(Math.max(...gameState.scores));
  // ctx.fillText(`Player ${winner + 1} wins!`, canvas.width / 2, canvas.height * 0.4);

  // 3. Restart button
  const btnWidth = Math.max(160, canvas.width * 0.25);
  const btnHeight = Math.max(50, canvas.height * 0.07);
  const x = (canvas.width - btnWidth) / 2;
  const y = canvas.height * 0.5;
  const borderRadius = Math.min(20, btnHeight * 0.3);

  // Save for click detection
  ui.gameOverButtonRect = new ButtonArea(x, y, btnWidth, btnHeight);
  ui.gameOverButtonRect.draw(ctx, borderRadius, "#fff");

  // Button text
  ctx.fillStyle = '#333';
  ctx.font = getFontString(Math.max(16, btnHeight * 0.4));
  ctx.fillText('Restart', canvas.width / 2, y + btnHeight / 2);
}

function getFontString(fontSize) {
  return `bold ${fontSize}px sans-serif`;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDraggingLine() {
  if (isValidMouseDown) {
    draggingLine.draw(ctx);
  }
}

function drawDetail() {
  clearCanvas();

  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    drawStartOption();
    drawBackButton();
    return;
  }

  // draw game elements
  // Draw lines
  gameState.lines.forEach(line => { line.draw(ctx); });

  // Draw triangles
  gameState.triangles.forEach(triangle => { triangle.draw(ctx); });

  // Draw points
  gameState.points.forEach(point => { point.draw(ctx); });

  // Scores Text
  drawScoreboardText();

  // draw back to intro button
  drawBackButton();

  // animate -- draw dragging line
  drawDraggingLine();

  if (gameState.gameState === GAME_STATE.GAME_ENDED) {
    drawGameOverOverlay();
  }
}


function resizeCanvas() {
  // set to fullscreen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  mylog(`Canvas resized to ${canvas.width}x${canvas.height}`);
  draw();
}

function draw() {
  drawDetail();
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

  ctx.fillStyle = Color.getBackgroundColor(currPlayer);
  ctx.fillRect(0, 0, canvas.width, y + 20);

  // Draw prefix
  ctx.fillStyle = 'black';
  ctx.fillText(prefix, x, y);
  x += ctx.measureText(prefix).width;

  // Draw current player number in color
  ctx.fillStyle = Color.getLineColor(currPlayer);
  ctx.fillText(currPlayerText, x, y);
  x += ctx.measureText(currPlayerText).width;

  // Draw suffix
  ctx.fillStyle = 'black';
  ctx.fillText(suffix, x, y);
  x += ctx.measureText(suffix).width;

  // Draw scores per player
  for (let i = 0; i < numPlayers; i++) {
    const scoreText = `${gameState.scores[i]}`;
    ctx.fillStyle = Color.getLineColor(i);
    ctx.fillText(scoreText, x, y);
    x += ctx.measureText(scoreText).width;

    if (i < numPlayers - 1) {
      ctx.fillStyle = 'black';
      ctx.fillText(slash, x, y);
      x += ctx.measureText(slash).width;
    }
  }
}

// ======================= Controller Functions ======================

let isSnapped = false;
let isValidMove = false;
let isValidMouseDown = false;
let draggingLine = null;

function resetDragState() {
  isValidMove = false;
  isSnapped = false;
  draggingLine = null;
}

// convert from clientX/clientY to canvas coordinates
function getTransformedMouseCoords(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return { x, y }
}

function updateSliderValueFromX(x) {
  const slider = ui.sliderRect;
  if (!slider) {
    return;
  }
  const percent = Math.max(0, Math.min(1, (x - slider.x) / slider.width));
  const newValue = Math.round(PTS_MIN + percent * (PTS_MAX - PTS_MIN));
  if (gameState.gameMode.points !== newValue) {
    gameState.gameMode.points = newValue;
    draw();
  }
}

function hideGameWindow() {
  // hide canvas
  canvas.style.display = 'none';
  // allow scroll
  document.body.style.overflow = 'auto';
}

function handleMouseDownBack(e) {
  const { x, y } = getTransformedMouseCoords(e.clientX, e.clientY);

  if (ui.backButtonRect.contains(x, y)) {
    hideGameWindow();
  }
}

function handleMouseDownStarting(e) {
  const { x, y } = getTransformedMouseCoords(e.clientX, e.clientY);

  // Check game mode buttons
  for (let i = 0; i < ui.buttonRects.length; i++) {
    if (ui.buttonRects[i].contains(x, y)) {
      gameState.gameMode.selectedMode = i;
      draw();
      return;
    }
  }

  // Check slider interaction
  if (ui.sliderRect.contains(x, y)) {
    isValidMouseDown = true;
    updateSliderValueFromX(x);
    return;
  }

  // Check Start button
  if (ui.startButtonRect.contains(x, y)) {
    startGame();
  }
}

function handleMouseMoveStarting(e) {
  if (!isValidMouseDown) return;

  const { x } = getTransformedMouseCoords(e.clientX, e.clientY);
  updateSliderValueFromX(x);
}


function handleMouseDownGame(e) {
  const { x, y } = getTransformedMouseCoords(e.clientX, e.clientY);
  const pt = new Point(x, y);

  for (let p of gameState.points) {
    if (p.distanceTo(pt) <= SNAP_DISTANCE) {
      draggingLine = new Line(p, pt, gameState.currPlayer);
      isValidMouseDown = true;
      break;
    }
  }
}

function handleMouseMoveGame(e) {
  if (!isValidMouseDown) return;

  const { x, y } = getTransformedMouseCoords(e.clientX, e.clientY);
  const mousePoint = new Point(x, y);
  mylog(`Mouse moved to: (${x}, ${y})`);

  if (!draggingLine || !draggingLine.start) {
    myerror("Dragging line start point is missing, cannot proceed.");
    resetDragState();
    return;
  }

  const st = draggingLine.start;

  // Try to find a nearby point to snap to
  const snapped = gameState.points.find(
    p => !p.equals(st) && p.distanceTo(mousePoint) <= SNAP_DISTANCE
  );

  const ed = snapped ?? mousePoint;
  isSnapped = !!snapped;

  draggingLine = new Line(st, ed, gameState.currPlayer);
  isValidMove = draggingLine.isValid(gameState.lines);
  draggingLine.dashed = !isValidMove;

  draw();
}


function handleMouseUpGame(e) {

  // Only allow saving if we actually snapped to a valid point
  if (isValidMove && isSnapped) {
    // Confirm the snap is to a valid endpoint

    // Create and save the line
    const newLine = new Line(draggingLine.start, draggingLine.end, gameState.currPlayer);
    gameState.lines.push(newLine);

    // check if valid triangle can be formed
    const found = detectTriangles(newLine);
    mylog(`Triangle found: ${found}`);

    // Advance to the next player
    if (!found) {
      gameState.currPlayer = (gameState.currPlayer + 1) % gameState.numPlayers;
    }

    // update the points' possible status
    for (let point of gameState.points) {
      point.updateSafe(gameState.triangles);
    }
    for (let point of gameState.points) {
      point.updatePossible(gameState.points, gameState.lines);
    }

    // check if game is over
    if (checkGameOver()) {
      gameState.gameState = GAME_STATE.GAME_ENDED;
    }
  }

  // Reset drag state
  resetDragState();
  draw();
}

function checkNewTriangle(triangle) {
  // check if triangle is valid (not overlay with other triangles)
  if (triangle.isValid(gameState.triangles)) {
    gameState.triangles.push(triangle);
    // Update scores
    gameState.scores[triangle.owner] += 1;
  }
}

/**
 * @param {Line} newLine
 * @returns {boolean} true if at least one triangle is found
 */
function detectTriangles(newLine) {
  // two ends of the new line is ensured to be valid
  const p1 = newLine.start;
  const p2 = newLine.end;
  const owner = newLine.owner;

  // Check all existing lines to see if they can form a triangle with the new line
  // consider all owner's line can be used, no need to check the owner
  // for (let line of gameState.lines) {
  let exists = false;
  for (let i = 0; i < gameState.lines.length; i++) {
    let line = gameState.lines[i];
    if (!line.isSameSegment(newLine) && line.shareAtLeastOneEndpoint(newLine)) {
      // We have a candidate line that shares an endpoint with the new line
      // find the missing line start and end
      const otherPoint = newLine.hasEndpoint(line.start) ? line.end : line.start;
      const sharedPoint = line.hasEndpoint(p1) ? p1 : p2;
      const otherPoint2 = line.hasEndpoint(p1) ? p2 : p1;
      const missingLine = new Line(otherPoint, otherPoint2, owner);

      // Check if line otherpoint to otherPoint2 already exists
      for (let j = i + 1; j < gameState.lines.length; j++) {
        if (gameState.lines[j].isSameSegment(missingLine)) {
          exists = true;
          const triangle = new Triangle(sharedPoint, otherPoint, otherPoint2, owner);
          checkNewTriangle(triangle);
          // do not break since it might find many triangles, count all
        }
      }
    }
  }
  return exists; // No triangle found
}

function handleMouseDownGameOver(e) {
  const { x, y } = getTransformedMouseCoords(e.clientX, e.clientY);

  if (ui.backButtonRect.contains(x, y)) {
    // Reset the game state to start a new game
    gameState.gameState = GAME_STATE.WAITING_FOR_OPTIONS;
    initGameData();
    draw();
  }
}

function handleMouseDown(e) {
  handleMouseDownBack(e);
  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    handleMouseDownStarting(e);
  } else if (gameState.gameState === GAME_STATE.GAME_STARTED) {
    handleMouseDownGame(e);
  } else if (gameState.gameState === GAME_STATE.GAME_ENDED) {
    handleMouseDownGameOver(e);
  }
}

function handleMouseMove(e) {
  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    handleMouseMoveStarting(e);
  } else if (gameState.gameState === GAME_STATE.GAME_STARTED) {
    handleMouseMoveGame(e);
  }
}

function handleMouseUp(e) {
  if (!isValidMouseDown) {
    return; // Ignore events if not dragging
  }
  isValidMouseDown = false;
  if (gameState.gameState === GAME_STATE.GAME_STARTED) {
    handleMouseUpGame(e);
  }
}

function checkGameOver() {
  // false if any point is not safe (inside a triangle) and
  // can connect to other non-safe points
  return !gameState.points.some(point => (!point.safe && point.possibleWithoutSafe));
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
}

function startGame() {
  // set gamemode to start
  gameState.gameState = GAME_STATE.GAME_STARTED;
  initGameData();
  draw();

}

function isCanvasVisible() {
  return canvas.style.display !== 'none';
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
  handleMouseDown(mouseEvent);
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
  handleMouseMove(mouseEvent);
}

function handleTouchEnd(e) {
  e.preventDefault();
  handleMouseUp(e);
}

function handleOnlyWhenCanvasVisible(func) {
  return (e) => {
    if (isCanvasVisible()) {
      func(e);
    }
  }
}

// Global listener to stop dragging on mouse up
window.addEventListener('mouseup', handleOnlyWhenCanvasVisible(handleMouseUp));
canvas.addEventListener('mousedown', handleOnlyWhenCanvasVisible(handleMouseDown));
canvas.addEventListener('mousemove', handleOnlyWhenCanvasVisible(handleMouseMove));
canvas.addEventListener('touchstart', handleOnlyWhenCanvasVisible(handleTouchStart));
canvas.addEventListener('touchmove', handleOnlyWhenCanvasVisible(handleTouchMove));
window.addEventListener('touchend', handleOnlyWhenCanvasVisible(handleTouchEnd));

function setupStartButton() {
  const startButton = document.getElementById('start-game');

  // handle touch as well
  startButton.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    startButton.click(); // Trigger the click event
  });

  // click to show the canvas
  startButton.addEventListener('click', () => {
    // change the text
    startButton.textContent = 'Click to show the game';
    // hide the start button
    canvas.style.display = 'block';

    // set the html body to ignore overflow
    document.body.style.overflow = 'hidden';

    // allow showing the reset button
    const resetButton = document.getElementById('reset-game');
    resetButton.style.display = 'block';
  });


}

function setupResetButton() {
  const resetButton = document.getElementById('reset-game');

  // handle touch as well
  resetButton.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    resetButton.click(); // Trigger the click event
  });

  // click to reset the game
  resetButton.addEventListener('click', () => {
    // hide the button
    resetButton.style.display = 'none';

    const startButton = document.getElementById('start-game');
    // change the text
    startButton.textContent = 'Click to start the game';

    // reset the game state
    gameState.gameState = GAME_STATE.WAITING_FOR_OPTIONS;
    initGameData();
    draw();
  });
}

function main() {
  setupStartButton();
  setupResetButton();
  resizeCanvas();
  // Add listener for resize
  window.addEventListener('resize', resizeCanvas);
  gameLoop();
}


