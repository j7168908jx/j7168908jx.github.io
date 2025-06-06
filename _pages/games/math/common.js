import { doTrianglesOverlap } from "./SAT.js";

/**
 * Represents a point in 2D space.
 */
export class PointBase {
  /**
   * Creates a new Point.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the Euclidean distance to another point.
   * @param {Point} other - The other point.
   * @returns {number} The distance to the other point.
   */
  distanceTo(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }

  /**
   * Draws the point on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {number} radius - The radius of the point to draw.
   * @param {string} color - The color of the point.
   * @returns {void}
   */
  draw(ctx, radius = 5, color = "black") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Represents a line segment between two points in 2D space.
 */
export class LineBase {
  /**
   * Creates a new line segment.
   * @param {PointBase} start - The starting point of the line.
   * @param {PointBase} end - The ending point of the line.
   */
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  /**
   * Calculates the length of the line segment.
   * @returns {number} The Euclidean distance between the start and end points.
   */
  length() {
    return this.start.distanceTo(this.end);
  }


  /**
   * Determines whether this line segment intersects with another line segment.
   * Note: Does not handle collinear overlapping cases.
   * @param {LineBase} other - Another line to check intersection with.
   * @param {boolean} [ignoreEndpoint=true] - Whether to ignore intersection at shared endpoints.
   * @returns {boolean} True if the lines intersect; false otherwise.
   */
  intersects(other, ignoreEndpoint = true) {
    // check if two lines are the same
    if (
      (this.start === other.start && this.end === other.end) ||
      (this.start === other.end && this.end === other.start)
    ) {
      return true; // the same lines are considered intersecting
    } else if (
      this.start === other.start || this.start === other.end ||
      this.end === other.start || this.end === other.end
    ) {
      // single shared endpoint
      return !ignoreEndpoint;
    }

    function ccw(a, b, c) {
      return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
    }

    return (
      ccw(this.start, other.start, other.end) !== ccw(this.end, other.start, other.end) &&
      ccw(this.start, this.end, other.start) !== ccw(this.start, this.end, other.end)
    );
  }

  /**
   * Draws the line on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {string} [strokeStyle="black"] - The color of the line.
   * @param {number[]} [dashStyle=null] - Optional dash pattern for the line.
   * @returns {void}
   */
  draw(ctx, strokeStyle = "black", dashStyle = null) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.setLineDash(dashStyle || []);
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }

}

/**
 * Represents a triangle defined by three points in 2D space.
 */
export class TriangleBase {
  /**
   * Creates a new triangle.
   * @param {PointBase} p1 - The first point of the triangle.
   * @param {PointBase} p2 - The second point of the triangle.
   * @param {PointBase} p3 - The third point of the triangle.
   */
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
  }

  /**
   * Checks whether this triangle intersects with another triangle.
   * @param {TriangleBase} other - Another triangle to check against.
   * @returns {boolean} True if any edges of the triangles intersect.
   */
  intersects(other) {
    // Check if this triangle intersects with another triangle
    return doTrianglesOverlap(this, other, true);
  }

  /**
   * Draws the triangle on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {string} [fillStyle=""] - Optional fill color for the triangle.
   * @returns {void}
   */
  draw(ctx, fillStyle = "") {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.lineTo(this.points[2].x, this.points[2].y);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
}
