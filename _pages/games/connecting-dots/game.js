import { PointBase, LineBase, TriangleBase } from '../math/common.js'

document.addEventListener('DOMContentLoaded', function () {
  main();
});

function mylog(message) {
  if (typeof console !== 'undefined' && console.log) {
    // console.log(message);
  }
}

const COLORS = {
  PLAYERS: [
    'rgba(255, 30, 0, 0.8)',    // Red
    'rgba(59, 144, 255, 0.8)',  // Blue
    'rgba(0, 228, 68, 0.8)',    // Green
    'rgba(235, 208, 0, 0.8)'    // Yellow
  ],
  BACKGROUNDS: [
    'rgba(255, 30, 0, 0.1)',    // Red
    'rgba(59, 144, 255, 0.1)',  // Blue
    'rgba(0, 228, 68, 0.1)',    // Green
    'rgba(235, 208, 0, 0.1)'    // Yellow
  ],
  TRIANGLES: [
    'rgba(255, 30, 0, 0.2)',    // Red
    'rgba(59, 144, 255, 0.2)',  // Blue
    'rgba(0, 228, 68, 0.2)',    // Green
    'rgba(255, 239, 14, 0.2)'   // Yellow
  ],
  DEFAULT: 'black',
  DISABLED: 'rgb(211, 211, 211)',
  GRAY: 'rgba(128, 128, 128, 0.1)'
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
  points: [],
  lines: [],
  triangles: [],
  currPlayer: 0,
  numPlayers: 0,
  scores: [],
  gameState: GAME_STATE.WAITING_FOR_OPTIONS,
  scoreboardText: "",
  isRotated: false,
  gameMode: {
    selectedMode: 1,          // 0 to 3
    points: 15,               // 5 to 50
  }
};

const ui = {
  buttonRects: [],
  sliderRect: {},
  startButtonRect: {},
  gameOverButtonRect: {},
  backButtonRect: {},
};


// ====================== Game Logic Classes ======================

class Point extends PointBase {
  constructor(x, y) {
    super(x, y);
    this.possible = true; // Indicates if the point can connect to other points
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
          mylog(`Point (${this.x}, ${this.y}) can connect to (${other.x}, ${other.y})`);
          return true; // This point can connect to another point
        }
      }
    }
    mylog(`Point (${this.x}, ${this.y}) cannot connect to any other point`);
    this.possible = false; // No valid connections found
    return false;
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


function pointToSegmentDistance(newPoint, lineEnd1, lineEnd2) {
  const px = newPoint.x;
  const py = newPoint.y;
  const x1 = lineEnd1.x;
  const y1 = lineEnd1.y;
  const x2 = lineEnd2.x;
  const y2 = lineEnd2.y;

  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    // The segment is a point
    const distSq = (px - x1) ** 2 + (py - y1) ** 2;
    return Math.sqrt(distSq);
  }

  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const tClamped = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1]

  const projX = x1 + tClamped * dx;
  const projY = y1 + tClamped * dy;

  const distSq = (px - projX) ** 2 + (py - projY) ** 2;
  return Math.sqrt(distSq);
}

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
        if (pointToSegmentDistance(newPoint, points[i], points[j]) < MIN_DIST_FROM_LINES) {
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
  Object.assign(ui.backButtonRect, { x, y, width: buttonWidth, height: buttonHeight });

  ctx.fillStyle = '#fff';
  drawRoundedRect(x, y, buttonWidth, buttonHeight, borderRadius);

  ctx.fillStyle = '#333';
  ctx.font = `bold ${Math.max(16, buttonHeight * 0.4)}px sans-serif`;
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

  ctx.font = `bold ${Math.max(16, buttonHeight * 0.3)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  buttonLabels.forEach((label, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = startX + col * (buttonWidth + spacingX);
    const y = startY + row * (buttonHeight + spacingY);

    // Save for interactivity
    ui.buttonRects.push({ x, y, width: buttonWidth, height: buttonHeight });

    ctx.fillStyle = (gameState.gameMode.selectedMode === i) ? '#ffe066' : '#fff';
    drawRoundedRect(x, y, buttonWidth, buttonHeight, borderRadius);
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

  // Save rect
  Object.assign(ui.sliderRect, { x: sliderX, y: sliderY, width: sliderWidth, height: sliderHeight });

  const sliderMin = 5;
  const sliderMax = 50;
  const value = gameState.gameMode.points;
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
  const btnWidth = Math.max(70, canvas.width * 0.4);
  const btnHeight = Math.max(50, canvas.height * 0.07);
  const x = (canvas.width - btnWidth) / 2;
  const y = canvas.height - btnHeight - 40;
  const borderRadius = Math.min(20, btnHeight * 0.3);

  // Save for click detection
  Object.assign(ui.startButtonRect, { x, y, width: btnWidth, height: btnHeight });

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
  ctx.fillStyle = 'rgba(177, 77, 77, 0.6)';
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
  Object.assign(ui.gameOverButtonRect, { x, y, width: btnWidth, height: btnHeight });

  // Button background
  ctx.fillStyle = '#fff';
  drawRoundedRect(x, y, btnWidth, btnHeight, borderRadius);

  // Button text
  ctx.fillStyle = '#333';
  ctx.font = `bold ${Math.max(16, btnHeight * 0.4)}px sans-serif`;
  ctx.fillText('Restart', canvas.width / 2, y + btnHeight / 2);
}

function drawDetail() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    drawStartOption();
    drawBackButton();
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

  // draw back button
  drawBackButton();


  // draw dragging line if in dragging state
  if (startPoint && currentMousePos && isGameMouseDown) {
    drawDraggingLine(startPoint, currentMousePos);
  }



  if (gameState.gameState === GAME_STATE.GAME_ENDED) {
    drawGameOverOverlay();
  }
}


function resizeCanvas() {
  // const parent = canvas.parentElement;
  // canvas.width = parent.clientWidth;
  // canvas.height = parent.clientHeight;

  // set to fullscreen
  const isPortrait = window.innerHeight > window.innerWidth;

  gameState.isRotated = isPortrait;


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;


  mylog(`Canvas resized to ${canvas.width}x${canvas.height}, rotated: ${gameState.isRotated}`);
  draw();
}

function draw() {
  // ctx.save();

  // if (gameState.isRotated) {
  //   // Rotate the canvas coordinate system 90° clockwise
  //   // ctx.translate(canvas.height, 0);
  //   // ctx.rotate(Math.PI / 2);
  // }
  drawDetail();
  // ctx.restore();
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

function drawDraggingLine(startPoint, currentMousePos) {

  // Draw the dragging line
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentMousePos.x, currentMousePos.y);
  ctx.strokeStyle = Color.getLineColor(gameState.currPlayer);

  if (!isValidMove) {
    ctx.setLineDash([6, 4]);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}




// ======================= Controller Functions ======================

function getTransformedMouseCoords(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();

  // if (gameState.isRotated) {
  //   // When rotated 90 degrees clockwise:
  //   const x = clientY - rect.top;
  //   const y = canvas.height - (clientX - rect.left);
  //   return { x, y };
  // } else {
  //   // Normal case
  //   const x = clientX - rect.left;
  //   const y = clientY - rect.top;
  //   return { x, y };
  // }

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return { x, y }
}


let isSliderMouseDown = false;

function updateSliderValueFromX(x) {
  const slider = ui.sliderRect;
  const percent = Math.max(0, Math.min(1, (x - slider.x) / slider.width));
  const newValue = Math.round(5 + percent * (50 - 5));
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
  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;
  const y = coords.y;

  // Check Start button
  const start = ui.backButtonRect;
  if (
    x >= start.x && x <= start.x + start.width &&
    y >= start.y && y <= start.y + start.height
  ) {
    hideGameWindow();
  }

}

function handleMouseDownStarting(e) {
  // const rect = canvas.getBoundingClientRect();
  // const x = e.clientX - rect.left;
  // const y = e.clientY - rect.top;

  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;
  const y = coords.y;

  // Check game mode buttons
  for (let i = 0; i < ui.buttonRects.length; i++) {
    const { x: bx, y: by, width, height } = ui.buttonRects[i];
    if (x >= bx && x <= bx + width && y >= by && y <= by + height) {
      gameState.gameMode.selectedMode = i;
      draw();
      return;
    }
  }

  // Check slider interaction
  const slider = ui.sliderRect;
  if (
    y >= slider.y - 10 && y <= slider.y + slider.height + 10 &&
    x >= slider.x && x <= slider.x + slider.width
  ) {
    isSliderMouseDown = true;
    updateSliderValueFromX(x);
    return;
  }

  // Check Start button
  const start = ui.startButtonRect;
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
  // const x = e.clientX - rect.left;

  // With this:
  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;

  updateSliderValueFromX(x);
}

let startPoint = null;
let currentMousePos = null;
let isSnapped = false;
let isValidMove = false;
let isGameMouseDown = false;

function handleMouseDownGame(e) {
  const rect = canvas.getBoundingClientRect();
  // const x = e.clientX - rect.left;
  // const y = e.clientY - rect.top;

  // With this:
  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;
  const y = coords.y;

  for (let p of gameState.points) {
    if (p.distanceTo(new Point(x, y)) <= SNAP_DISTANCE) {
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
  // const x = e.clientX - rect.left;
  // const y = e.clientY - rect.top;

  // With this:
  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;
  const y = coords.y;

  // mylog(`Mouse moved to: (${x}, ${y})`);

  // Try to snap to a real point
  let snapped = null;
  for (let p of gameState.points) {
    if (p !== startPoint && p.distanceTo(new Point(x, y)) <= SNAP_DISTANCE) {
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

}


function handleMouseUp(e) {
  if (!isCanvasVisible()) {
    return; // Ignore events if canvas is not visible
  }
  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    handleMouseUpStarting(e);
  } else if (gameState.gameState === GAME_STATE.GAME_STARTED) {
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
    mylog(`Triangle found: ${found}`);

    // Advance to the next player (optional logic)
    if (!found) {
      gameState.currPlayer = (gameState.currPlayer + 1) % gameState.numPlayers;
    }

    // check if game is over
    if (checkGameOver()) {
      gameState.gameState = GAME_STATE.GAME_ENDED;
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
  // for (let line of gameState.lines) {
  let exists = false;
  for (let i = 0; i < gameState.lines.length; i++) {
    let line = gameState.lines[i];
    if (line !== newLine && (line.start === p1 || line.start === p2 || line.end === p1 || line.end === p2)) {
      // We have a candidate line that shares an endpoint with the new line
      // find the missing line start and end
      let otherPoint = (line.start === p1 || line.start === p2) ? line.end : line.start;
      let sharedPoint = (otherPoint === line.start) ? line.end : line.start;
      let otherPoint2 = (sharedPoint === p1) ? p2 : p1;

      // Check if line otherpoint to otherPoint2 already exists
      for (let j = i + 1; j < gameState.lines.length; j++) {
        // for (let existingLine of gameState.lines) {
        let existingLine = gameState.lines[j];
        if (
          (existingLine.start === otherPoint && existingLine.end === otherPoint2) ||
          (existingLine.start === otherPoint2 && existingLine.end === otherPoint)
        ) {
          exists = true;
          const triangle = new Triangle(sharedPoint, otherPoint, otherPoint2, owner);

          // check if triangle is valid (not overlay with other triangles)
          if (triangle.isValid(gameState.triangles)) {
            gameState.triangles.push(triangle);
            // Update scores
            gameState.scores[owner] += 1;
          }
          // do not break since it might form many
        }
      }
    }
  }
  return exists; // No triangle found
}

function handleMouseDownGameOver(e) {
  const rect = canvas.getBoundingClientRect();
  // const x = e.clientX - rect.left;
  // const y = e.clientY - rect.top;

  // With this:
  const coords = getTransformedMouseCoords(e.clientX, e.clientY);
  const x = coords.x;
  const y = coords.y;

  // Check if the click is within the game over button
  const gameOverButton = ui.gameOverButtonRect;
  if (
    x >= gameOverButton.x && x <= gameOverButton.x + gameOverButton.width &&
    y >= gameOverButton.y && y <= gameOverButton.y + gameOverButton.height
  ) {
    // Reset the game state to start a new game
    gameState.gameState = GAME_STATE.WAITING_FOR_OPTIONS;
    initGameData();
    draw();
  }
}

function handleMouseDown(e) {
  if (!isCanvasVisible()) {
    return; // Ignore events if canvas is not visible
  }
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
  if (!isCanvasVisible()) {
    return; // Ignore events if canvas is not visible
  }
  if (gameState.gameState === GAME_STATE.WAITING_FOR_OPTIONS) {
    handleMouseMoveStarting(e);
  } else if (gameState.gameState === GAME_STATE.GAME_STARTED) {
    handleMouseMoveGame(e);
  }
}

function checkGameOver() {
  // true if all points are not possible anymore
  return gameState.points.every(point => !point.possible);
}

function gameLoop() {
  // draw();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  // set gamemode to start
  gameState.gameState = GAME_STATE.GAME_STARTED;
  initGameData();
  draw();

}

function isCanvasVisible() {
  // check if canvas is visible
  return canvas.style.display !== 'none';
}

function handleTouchStart(e) {
  if (!isCanvasVisible()) {
    return; // Ignore touch events if canvas is not visible
  }
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
  handleMouseDown(mouseEvent);
}

function handleTouchMove(e) {
  if (!isCanvasVisible()) {
    return; // Ignore touch events if canvas is not visible
  }
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
  handleMouseMove(mouseEvent);
}

function handleTouchEnd(e) {
  if (!isCanvasVisible()) {
    return; // Ignore touch events if canvas is not visible
  }
  e.preventDefault();
  handleMouseUp(e);
}

// Global listener to stop dragging on mouse up
window.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
window.addEventListener('touchend', handleTouchEnd);

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


