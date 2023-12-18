import { Point } from '../primitives/point';
import { Segment } from '../primitives/segment';

export class Graph {
  public points: Point[];
  public segments: Segment[];

  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  public addPoint(point: Point) {
    this.points.push(point);
  }

  public containsPoint(point: Point): boolean {
    return this.points.find((p) => p.equals(point)) !== undefined;
  }

  public tryAddPoint(point: Point): boolean {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  public removePoint(point: Point): Point | null {
    const index = this.points.findIndex((p) => p.equals(point));
    if (index !== -1) {
      this.points.splice(index, 1);
      this.segments = this.segments.filter((s) => !s.includes(point));
      return point;
    }
    return null;
  }

  public addSegment(seg: Segment): number {
    return this.segments.push(seg);
  }

  public containsSegment(seg: Segment): boolean {
    return this.segments.find((s) => s.equals(seg)) !== undefined;
  }

  public tryAddSegment(seg: Segment): boolean {
    if (!this.containsSegment(seg)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  public removeSegment(seg: Segment): Segment | null {
    const index = this.segments.findIndex((s) => s.equals(seg));
    if (index !== -1) {
      this.segments.splice(index, 1);
      return seg;
    }
    return null;
  }

  public getSegmentsWithPoints(point: Point): Segment[] {
    return this.segments.filter((s) => s.includes(point));
  }

  public dispose(): void {
    this.points.length = 0;
    this.segments.length = 0;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
