// Helper: project a polygon onto an axis and return min/max scalar projection
function projectPolygon(points, axis) {
  let min = Infinity;
  let max = -Infinity;

  for (let point of points) {
    const projection = point.x * axis.x + point.y * axis.y;
    min = Math.min(min, projection);
    max = Math.max(max, projection);
  }

  return { min, max };
}

function FPLess(v1, v2, err = 1e-6) {
  // check if v1 is sufficiently less than v2
  // using a small error margin to avoid floating point precision issues
  return v1 < v2 - err;
}


function FPLessOrEqual(v1, v2, err = 1e-6) {
  // check if v1 is approximately less than or equal to v2
  return v1 <= v2 + err;
}


// Helper: check if two projection intervals overlap
function projectionsOverlap(p1, p2, allowTouching) {

  // If allowTouching is true, we consider touching edges as overlapping
  if (allowTouching) {
    // return !(p1.max <= p2.min || p2.max <= p1.min);
    return !(FPLessOrEqual(p1.max, p2.min) || FPLessOrEqual(p2.max, p1.min));
  } else {
    // Standard overlap check (strictly greater than)
    // return !(p1.max < p2.min || p2.max < p1.min);
    return !(FPLess(p1.max, p2.min) || FPLess(p2.max, p1.min));
  }
}

// Get all unique edge normals from a triangle (axes for SAT)
function getAxes(points) {
  const axes = [];

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const edge = { x: p2.x - p1.x, y: p2.y - p1.y };

    // Get the perpendicular (normal) vector
    const normal = { x: -edge.y, y: edge.x };

    // Normalize (optional for projection accuracy)
    const length = Math.hypot(normal.x, normal.y);
    axes.push({ x: normal.x / length, y: normal.y / length });
  }

  return axes;
}

// Main: Check if two triangles overlap using SAT
export function doTrianglesOverlap(triA, triB, allowTouching) {
  const axesA = getAxes(triA.points);
  const axesB = getAxes(triB.points);
  const axes = axesA.concat(axesB); // Test all normals

  for (let axis of axes) {
    const projA = projectPolygon(triA.points, axis);
    const projB = projectPolygon(triB.points, axis);
    if (!projectionsOverlap(projA, projB, allowTouching)) {
      return false; // Found a separating axis
    }
  }

  return true; // No separating axis found
}