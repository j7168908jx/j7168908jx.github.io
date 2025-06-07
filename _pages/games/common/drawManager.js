// ====================== DRAWING CONTROL SYSTEM ======================

export class DrawManager {
  constructor(drawFunc) {
    this.needsRedraw = false;
    this.isDrawing = false;
    this.animationFrameId = null;
    this.drawFunc = drawFunc;
  }

  // Request a redraw (debounced using requestAnimationFrame)
  requestDraw() {
    if (this.needsRedraw) return; // Already scheduled

    this.needsRedraw = true;
    this.animationFrameId = requestAnimationFrame(() => {
      this.performDraw();
    });
  }

  // Force immediate draw (use sparingly)
  forceDraw() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.performDraw();
  }

  performDraw() {
    if (this.isDrawing) return; // Prevent recursive calls

    this.isDrawing = true;
    this.needsRedraw = false;

    try {
      this.drawFunc();
    } catch (error) {
      console.error('Draw error:', error);
    } finally {
      this.isDrawing = false;
    }
  }

  // Cancel any pending draw
  cancelDraw() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      this.needsRedraw = false;
    }
  }
}

/* Usage Example:

// const drawManager = new DrawManager(drawImplFunc);

// Replace all draw() calls with this
function draw() {
  drawManager.requestDraw();
}

// For cases where immediate draw is absolutely necessary
function drawImmediate() {
  drawManager.forceDraw();
}

*/