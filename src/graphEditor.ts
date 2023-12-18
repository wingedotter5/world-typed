import { Graph } from './math/graph';
import { getNearestPoint } from './math/utils';
import { Point } from './primitives/point';
import { Segment } from './primitives/segment';

export class GraphEditor {
  public canvas: HTMLCanvasElement;
  public graph: Graph;
  public ctx: CanvasRenderingContext2D;
  public selected: Point | null;
  public hovered: Point | null;
  public dragging: boolean;
  public mouse: Point | null;

  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));

    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));

    this.canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());

    this.canvas.addEventListener('mouseup', () => (this.dragging = false));
  }

  private handleMouseDown(ev: MouseEvent): void {
    // Right click
    if (ev.button === 2) {
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.removePoint(this.hovered);
      }
    }

    // Left click
    if (ev.button === 0) {
      if (this.hovered) {
        this.select(this.hovered);
        this.dragging = true;
        return;
      }

      this.graph.addPoint(this.mouse!);
      this.select(this.mouse!);
      this.hovered = this.mouse;
    }
  }

  private handleMouseMove(ev: MouseEvent) {
    this.mouse = new Point(ev.offsetX, ev.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
    if (this.dragging && this.selected) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  private select(point: Point): void {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  private removePoint(point: Point): void {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected === point) {
      this.selected = null;
    }
  }

  public display(): void {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ?? this.mouse;
      new Segment(this.selected, intent!).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
