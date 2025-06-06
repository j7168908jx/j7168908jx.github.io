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
   * @param {PointBase} other - The other point.
   * @returns {number} The distance to the other point.
   */
  distanceTo(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }

  /**
   * @param {PointBase} other - THe other point to compare with.
   * @returns {boolean} True if the two points are equal, false otherwise.
   */
  equals(other) {
    // Check if two points are equal
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Calculates the shortest distance from this point to a line segment defined by two endpoints.
   * If the perpendicular projection of this point onto the line defined by the segment falls outside the segment,
   * the distance to the nearest endpoint is returned.
   *
   * @param {PointBase} lineEnd1 - The first endpoint of the line segment.
   * @param {PointBase} lineEnd2 - The second endpoint of the line segment.
   * @returns {number} The shortest distance from this point to the line segment.
   */
  distanceToLineSegment(lineEnd1, lineEnd2) {
    const dx = lineEnd2.x - lineEnd1.x;
    const dy = lineEnd2.y - lineEnd1.y;

    if (dx === 0 && dy === 0) {
      // The line segment is a point
      return this.distanceTo(lineEnd1);
    }

    const sqr = (dx * dx + dy * dy);
    const t = ((this.x - lineEnd1.x) * dx + (this.y - lineEnd1.y) * dy) / sqr;
    if (t < 0) {
      return this.distanceTo(lineEnd1);
    } else if (t > 1) {
      return this.distanceTo(lineEnd2);
    }

    const projectionX = lineEnd1.x + t * dx;
    const projectionY = lineEnd1.y + t * dy;
    return this.distanceTo(new PointBase(projectionX, projectionY));
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
    if (!(start instanceof PointBase) || !(end instanceof PointBase)) {
      throw new TypeError("start and end must be instances of PointBase");
    }
    this.start = start;
    this.end = end;
    this.points = [start, end];
  }

  /**
   * Calculates the length of the line segment.
   * @returns {number} The Euclidean distance between the start and end points.
   */
  length() {
    return this.start.distanceTo(this.end);
  }

  /**
   * Equal check without vector direction.
   * @param {LineBase} other - Another line segment to compare with.
   * @returns {boolean} True if the two line segments are the same, false otherwise.
   */
  isSameSegment(other) {
    // Check if two lines are the same segment
    return (
      (this.start.equals(other.start) && this.end.equals(other.end)) ||
      (this.start.equals(other.end) && this.end.equals(other.start))
    );
  }

  /**
   * Equal check with vector direction (same start and end).
   * @param {LineBase} other - Another line segment to compare with.
   * @returns {boolean} True if the two line segments are the same, false otherwise.
   */
  equals(other) {
    // Check if two lines are equal (same start and end points)
    return this.start.equals(other.start) && this.end.equals(other.end);
  }

  /**
   *
   * @param {LineBase} other - Another line segment to compare with.
   * @returns {boolean} True if the two line segments share at least one endpoint.
   */
  shareAtLeastOneEndpoint(other) {
    // Check if two lines share at least one endpoint
    return (
      this.start.equals(other.start) ||
      this.start.equals(other.end) ||
      this.end.equals(other.start) ||
      this.end.equals(other.end)
    );
  }

  /**
   * Checks if the line segment has a specific endpoint.
   * @param {PointBase} point - The point to check as an endpoint.
   * @returns {boolean} True if the line segment has the specified endpoint.
   */
  hasEndpoint(point) {
    // Check if the line segment has a specific endpoint
    return this.start.equals(point) || this.end.equals(point);
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
    if (this.isSameSegment(other)) {
      return true; // the same lines are considered intersecting
    } else if (this.shareAtLeastOneEndpoint(other)) {
      return !ignoreEndpoint;
    }

    // counter-clockwise check
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
  
  strictlyContains(point) {
    const a = this.points[0];
    const b = this.points[1];
    const c = this.points[2];

    const area = 0.5 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
    const sign = area < 0 ? -1 : 1;

    const s = sign * (a.y * c.x - a.x * c.y + (c.y - a.y) * point.x + (a.x - c.x) * point.y);
    const t = sign * (a.x * b.y - a.y * b.x + (a.y - b.y) * point.x + (b.x - a.x) * point.y);
    const area2 = 2 * area * sign;

    return s > 0 && t > 0 && (s + t) < area2;
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
