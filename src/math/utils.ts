import { Point } from '../primitives/point';

export function getNearestPoint(
  location: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER,
): Point | null {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;

  for (const point of points) {
    const dist = distance(point, location);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }

  return nearest;
}

export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
