import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Line, Point } from '../../models/line.interface';
import { ButtonModule } from 'primeng/button';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'create-shape',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './create-shape.component.html',
  styleUrls: ['./create-shape.component.less'],
})
export class CreateShapeComponent {
  constructor(private shapeService: ShapeService) {}

  @ViewChild('canvasEl', { static: true })
  public isDrawing = false;
  public waitingForConfirmation: boolean = false;
  public startX: number = 0;
  public startY: number = 0;
  public points: Point[] = [];
  public tempPoints: Point[] = [];
  public undoActions: string[] = [];
  public drawnLines: Line[] = [];
  public lines: Line[] = [];

  private canvasEl: ElementRef<HTMLCanvasElement> =
    {} as ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  @Output()
  shapeCreated = new EventEmitter<Line[]>();

  // Get canvas element and context
  public ngAfterViewInit() {
    this.ctx = this.canvasEl.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
  }

  public startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    const startingPoint: Point = {} as Point;

    // x & y coordinates where the mouse was clicked
    startingPoint.x = event.offsetX;
    startingPoint.y = event.offsetY;

    // Save starting point
    //this.startX = startingPoint.x;
    //this.startY = startingPoint.y;

    this.tempPoints.push(startingPoint);
  }

  public drawShape(event: MouseEvent) {
    if (!this.isDrawing) return;
    const newPoint: Point = {} as Point;

    // x & y coordinates where the mouse was dragged to
    newPoint.x = event.offsetX;
    newPoint.y = event.offsetY;
    let lastPointInserted = this.tempPoints.push(newPoint) - 1;

    // Add undo action that will enable to the user to undo the last action
    this.undoActions.push('add');
    this.drawPath(lastPointInserted);
  }

  public drawPath(lastPointInserted: number) {
    this.ctx.beginPath();
    //if (this.tempPoints.length < 2) return;
    this.ctx.moveTo(
      this.tempPoints[lastPointInserted - 1].x,
      this.tempPoints[lastPointInserted - 1].y
    );
    this.ctx.lineTo(
      this.tempPoints[lastPointInserted].x,
      this.tempPoints[lastPointInserted].y
    );
    this.ctx.stroke();
  }

  public finishDrawing(event: MouseEvent) {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    // convert points to lines
    let convertedToLines: Line[] = this.convertPointsToLines(this.tempPoints);

    // Add lines to the lines array and the drawn lines array (for undo/redo)
    this.lines.push(...convertedToLines);
    this.drawnLines.push(...convertedToLines);

    this.tempPoints = []; // Reset temp points array for the next lines collection
    console.log(this.lines);
    // Add undo action
    this.undoActions.push('add');

    this.waitingForConfirmation = true;
  }

  public addShape() {
    this.shapeService.lines.push(this.lines); // Add the lines to the shape service
    this.clearCanvas();
  }

  // Undo the last action
  public undo() {
    console.log(this.undoActions.length);
    if (this.drawnLines.length === 0 || this.undoActions.length === 0) {
      return;
    }

    // Get the last action and remove it from the collection
    const lastAction = this.undoActions.pop();
    if (lastAction === 'add') {
      this.lines.pop();
    }

    // Clear canvas and redraw shapes
    this.clearCanvas();
    this.drawShapeLines();
  }

  public redo() {
    // No redo actions available
    if (this.undoActions.length === 0) {
      return;
    }

    // Get the last action and return it back to the collection
    const lastAction = this.undoActions[this.undoActions.length - 1];
    if (lastAction === 'add') {
      const line = this.drawnLines[this.lines.length - 1];
      this.lines.push(line);
      this.undoActions.push(lastAction);
    }

    // Clear canvas and redraw shapes
    this.clearCanvas();
    this.drawShapeLines();
  }

  // Draw all lines
  private drawShapeLines() {
    this.lines.forEach((line) => {
      this.ctx.beginPath();
      this.ctx.moveTo(parseFloat(line.fromX), parseFloat(line.fromY));
      this.ctx.lineTo(parseFloat(line.toX), parseFloat(line.toY));
      this.ctx.stroke();
    });
  }

  // Clear canvas
  private clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasEl.nativeElement.width,
      this.canvasEl.nativeElement.height
    );
  }

  private convertPointsToLines(points: Point[]): Line[] {
    // Convert the array of points to Line[] object
    const lines: Line[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const currentPoint = points[i];
      const nextPoint = points[i + 1];

      const line: Line = {
        fromX: currentPoint.x.toString(),
        fromY: currentPoint.y.toString(),
        toX: nextPoint.x.toString(),
        toY: nextPoint.y.toString(),
      };

      lines.push(line);
    }

    return lines;
  }
}
