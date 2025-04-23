
const outputArea = document.getElementById('output-area');
const addMatrixButton = document.getElementById('add-matrix');
const undoButton = document.getElementById('undo');
const clearButton = document.getElementById('clear');
const addMathTextButton = document.getElementById('add-math-text');

const pastel = ['rgb(161, 201, 244)', 'rgb(255, 180, 130)', 'rgb(141, 229, 161)', 'rgb(255, 159, 155)', 'rgb(208, 187, 255)', 'rgb(222, 187, 155)', 'rgb(250, 176, 228)', 'rgb(207, 207, 207)', 'rgb(255, 254, 163)', 'rgb(185, 242, 240)'];
const pastel6 = ['rgb(161, 201, 244)', 'rgb(141, 229, 161)', 'rgb(255, 159, 155)', 'rgb(208, 187, 255)', 'rgb(255, 254, 163)', 'rgb(185, 242, 240)'];
const COLORS = [...pastel, ...pastel6,
  "rgb(255, 244, 66)", "rgb(39, 193, 183)", "rgb(255, 81, 196)", "rgb(228, 157, 253)", "rgb(122, 238, 255)", "rgb(229, 0, 128)", "rgb(255, 53, 53)", "rgb(248, 181, 0)", "rgb(255, 127, 39)", "rgb(116, 244, 102)", "rgb(132, 195, 110)", "rgb(243, 152, 0)", "rgb(178, 255, 221)", "rgb(248, 200, 196)", "rgb(106, 230, 115)", "rgb(206, 191, 191)", "rgb(160, 255, 249)", "rgb(162, 215, 221)", "rgb(0, 0, 160)", "rgb(157, 141, 226)", "rgb(243, 133, 0)", "rgb(166, 100, 160)", "rgb(196, 85, 246)", "rgb(237, 125, 149)", "rgb(104, 190, 141)", "rgb(255, 111, 190)", "rgb(255, 149, 71)", "rgb(255, 79, 145)", "rgb(83, 131, 195)", "rgb(1, 183, 237)", "rgb(186, 38, 54)", "rgb(198, 50, 32)", "rgb(156, 165, 185)", "rgb(255, 248, 50)", "rgb(163, 70, 157)", "rgb(231, 214, 0)", "rgb(102, 192, 255)", "rgb(216, 28, 47)", "rgb(255, 208, 16)", "rgb(219, 8, 57)", "rgb(255, 110, 144)", "rgb(231, 96, 158)", "rgb(23, 105, 255)", "rgb(193, 202, 212)", "rgb(118, 221, 233)", "rgb(255, 88, 0)", "rgb(25, 177, 246)", "rgb(255, 80, 62)", "rgb(194, 82, 198)", "rgb(72, 94, 198)", "rgb(200, 194, 198)", "rgb(250, 215, 100)", "rgb(255, 158, 172)", "rgb(169, 168, 152)", "rgb(55, 180, 132)"
]

/**
 * Implementation of matplotlib's jet/rainbow colormap
 * @param {number} value - Value between 0 and 1
 * @returns {string} CSS RGB color string
 */
function jetColormap(value) {
  // Ensure value is in range [0,1]
  value = Math.max(0, Math.min(1, value));

  let r, g, b;

  // Red component: increases from 0->1 when value in [0.375, 0.625]
  //                stays 1 when value in [0.625, 0.875]
  //                decreases from 1->0 when value in [0.875, 1.0]
  if (value < 0.375) {
    r = 0;
  } else if (value < 0.625) {
    r = (value - 0.375) * 4;
  } else if (value < 0.875) {
    r = 1;
  } else {
    r = (1.0 - value) * 4;
  }

  // Green component: increases from 0->1 when value in [0.125, 0.375]
  //                  stays 1 when value in [0.375, 0.625]
  //                  decreases from 1->0 when value in [0.625, 0.875]
  if (value < 0.125) {
    g = 0;
  } else if (value < 0.375) {
    g = (value - 0.125) * 4;
  } else if (value < 0.625) {
    g = 1;
  } else if (value < 0.875) {
    g = (0.875 - value) * 4;
  } else {
    g = 0;
  }

  // Blue component: decreases from 1->0 when value in [0.125, 0.375]
  //                 stays 0 when value in [0.375, 0.875]
  //                 increases from 0->1 when value in [0.875, 1.0]
  if (value < 0.125) {
    b = 1;
  } else if (value < 0.375) {
    b = (0.375 - value) * 4;
  } else if (value < 0.875) {
    b = 0;
  } else {
    b = (value - 0.875) * 4;
  }

  // Convert to RGB integers
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function drawMatrix(ctx, matrix, xOffset, yOffset, options) {
  const { cellSize, borderColor, borderWidth } = options;

  const rows = matrix.rows;
  const cols = matrix.cols;
  const type = matrix.type;
  const grid = matrix.grid;
  // Draw each cell
  console.log('Drawing matrix with options:', options);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (type === 'l' && i < j) continue; // skip upper triangle
      if (type === 'u' && i > j) continue; // skip lower triangle
      const x = xOffset + j * (cellSize + borderWidth);
      const y = yOffset + i * (cellSize + borderWidth);

      ctx.fillStyle = grid.getColorForProc(matrix.getProcessIdAt(i, j));
      ctx.fillRect(x, y, cellSize, cellSize);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}

class Grid {
  constructor(nprow, npcol) {
    this.nprow = nprow;
    this.npcol = npcol;
    this.nproc = nprow * npcol;
  }

  getColorForProc(i) {
    // create a random colormap and map the color to it
    // return jetColormap
    if (i < COLORS.length) {
      return COLORS[i];
    } else {
      return jetColormap(i / this.nproc);
    }
  }
}

class Matrix {
  constructor(grid, type, rows, cols, mb, nb, rowsrc, colsrc, matrixStyleOptions) {
    this.grid = grid
    this.type = type; // n: normal, l: lower, u: upper
    this.rows = rows;
    this.cols = cols;
    this.mb = mb;
    this.nb = nb;
    this.rowsrc = rowsrc;
    this.colsrc = colsrc;
    this.styleOptions = matrixStyleOptions;
  }

  getSize(ctx) {
    const cellSize = this.styleOptions.cellSize;
    const borderSize = this.styleOptions.borderWidth;
    return {
      width: this.cols * cellSize + (this.cols - 1) * borderSize,
      height: this.rows * cellSize + (this.rows - 1) * borderSize
    };
  }

  getProcessIdAt(i, j) {
    const nprow = this.grid.nprow;
    const npcol = this.grid.npcol;
    const processId = ((Math.floor(i / this.mb) + this.rowsrc) % nprow) * npcol +
      ((Math.floor(j / this.nb) + this.colsrc) % npcol);
    return processId;
  }

  drawAt(ctx, xOffset, yOffset) {
    drawMatrix(ctx, this, xOffset, yOffset, this.styleOptions);

    // draw a bounding box
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 1;
    // ctx.strokeRect(xOffset, yOffset, this.getSize(ctx).width, this.getSize(ctx).height);
  }
}

async function renderMathToImg(mathString) {
  // Create a temporary container
  const tempDiv = document.createElement('div');
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-1000px';
  tempDiv.innerHTML = `\\(${mathString}\\)`;
  document.body.appendChild(tempDiv);

  // Wait for MathJax to render the math inside it
  await MathJax.typesetPromise([tempDiv]);

  const svg = tempDiv.querySelector('svg');
  if (!svg) {
    console.error('No SVG produced by MathJax');
    document.body.removeChild(tempDiv);
    return null;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  const imgLoaded = new Promise((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(url); // Clean up URL
      resolve();
    };
    img.onerror = reject;
  });

  img.src = url;
  await imgLoaded;

  const width = svg.width.baseVal.value;
  const height = svg.height.baseVal.value;

  // Clean up
  document.body.removeChild(tempDiv);

  return { img, width, height };
}


class TextElement {
  constructor(symbol) {
    this.symbol = symbol;
    this.img = null;
    this.width = 0;
    this.height = 0;
    this.renderPromise = null; // Ensures single in-flight render
  }

  async render() {
    if (!this.renderPromise) {
      this.renderPromise = (async () => {
        const { img, width, height } = await renderMathToImg(this.symbol);
        this.img = img;
        this.width = width;
        this.height = height;
      })();
    }
    await this.renderPromise;
  }

  async getSize(ctx) {
    await this.render(); // Ensure rendering is complete
    return {
      width: this.width,
      height: this.height
    };
  }

  async drawAt(ctx, xOffset, yOffset) {
    await this.render(); // Ensure it's fully rendered
    ctx.drawImage(this.img, xOffset, yOffset);

    // plot a bounding box of img
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 1;
    // ctx.strokeRect(xOffset, yOffset, this.width, this.height);

  }
}

function undo() {
  if (elementsToDraw.length > 0) {
    elementsToDraw.pop();
  }
}

async function drawElements() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (elementsToDraw.length === 0) {
    return;
  }

  const paddingSize = 10;

  // Wait for all sizes to be available
  const sizes = await Promise.all(elementsToDraw.map(el => el.getSize(ctx)));

  const totalWidth =
    sizes.reduce((sum, size) => sum + size.width, 0) +
    paddingSize * (elementsToDraw.length - 1);

  // Center the elements
  const centerX = (canvas.width - totalWidth) / 2;
  let currentX = centerX;

  for (let i = 0; i < elementsToDraw.length; i++) {
    const element = elementsToDraw[i];
    const size = sizes[i];

    await element.drawAt(
      ctx,
      currentX,
      canvas.height / 2 - size.height / 2
    );

    currentX += size.width + paddingSize;
  }
}

var defaultOptions = {
  cellSize: 8,
  borderColor: '#fff',
  borderWidth: 1,
};


var elementsToDraw = [];  // matrices or special elements

// Sample matrix
// const grid = new Grid(2, 2);
// const matrix = new Matrix(grid, 'u', 3, 3, 2, 2, 0, 0, defaultOptions);

// elementsToDraw.push(matrix);
// elementsToDraw.push(new TextElement('-+*/'));
// elementsToDraw.push(new TextElement('66666'));

// draw a reference line at the middle point horizonal
// ctx.beginPath();
// ctx.moveTo(0, canvas.height / 2);
// ctx.lineTo(canvas.width, canvas.height / 2);
// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
// ctx.stroke();
// ctx.closePath();

addMatrixButton.addEventListener('click', async () => {
  const nprow = parseInt(document.getElementById('nprow').value);
  const npcol = parseInt(document.getElementById('npcol').value);
  const rows = parseInt(document.getElementById('matrix-rows').value);
  const cols = parseInt(document.getElementById('matrix-cols').value);
  const matrixType = document.querySelector('input[name="matrix-type"]:checked').value;
  const mb = parseInt(document.getElementById('mb').value);
  const nb = parseInt(document.getElementById('nb').value);
  const rowsrcproc = parseInt(document.getElementById('rowsrcproc').value);
  const colsrcproc = parseInt(document.getElementById('colsrcproc').value);

  // if any nan value, return warning dialog box
  if (isNaN(nprow) || isNaN(npcol) || isNaN(rows) || isNaN(cols) || isNaN(mb) || isNaN(nb) || isNaN(rowsrcproc) || isNaN(colsrcproc)) {
    alert('Please enter valid numbers for all fields.');
    return;
  }

  // create grid and matrix
  const grid = new Grid(nprow, npcol);
  const matrix = new Matrix(grid, matrixType, rows, cols, mb, nb, rowsrcproc, colsrcproc, defaultOptions);
  elementsToDraw.push(matrix);
  await drawElements();
});

undoButton.addEventListener('click', async () => {
  undo();
  await drawElements();
});

clearButton.addEventListener('click', async () => {
  elementsToDraw = [];
  await drawElements();
});


addMathTextButton.addEventListener('click', async () => {
  const mathText = document.getElementById('math-text').value;
  if (mathText.trim() === '') {
    alert('Please enter a valid math text.');
    return;
  }

  const textElement = new TextElement(mathText);
  elementsToDraw.push(textElement);
  await drawElements();
});

function resizeCanvasToContainer() {
  const canvas = document.getElementById('canvas');
  const container = canvas.parentElement;

  // Get the real rendered size of the container
  const width = container.clientWidth;
  const height = container.clientHeight; // Default/fallback height

  // Set the canvas drawing size to match
  canvas.width = width;
  canvas.height = height;
  drawElements();
}

const cellSizeDisplay = document.getElementById('cell-size-display');
cellSizeDisplay.innerText = defaultOptions.cellSize;

const increaseSizeBtn = document.getElementById('increase-cell-size');
const decreaseSizeBtn = document.getElementById('decrease-cell-size');

increaseSizeBtn.addEventListener('click', () => { defaultOptions.cellSize += 1; cellSizeDisplay.innerText = defaultOptions.cellSize; drawElements(); });
decreaseSizeBtn.addEventListener('click', () => { defaultOptions.cellSize -= 1; cellSizeDisplay.innerText = defaultOptions.cellSize; drawElements(); });

window.addEventListener('load', resizeCanvasToContainer);
window.addEventListener('resize', resizeCanvasToContainer);



MathJax = {
  extensions: ["tex2jax.js"],
  tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true,
      processRefs: true,
      processEnvironments: true
  },
  TeX: {
    equationNumbers: { autoNumber: "AMS" },
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js", "color.js","autoload-all.js"]
  },
  "HTML-CSS": {
    scale: 80, linebreaks: { automatic: true }
  },
  "CommonHTML": {
    scale: 80, linebreaks: { automatic: true }
  },
  "startup": {
      pageReady: async () => {await drawElements();}
  }
};
