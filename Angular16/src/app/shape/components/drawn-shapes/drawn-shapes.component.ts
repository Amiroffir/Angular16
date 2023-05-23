import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Line } from '../../models/line.interface';
import { Shape } from '../../models/shape.interface';
import { Color, SystemColors } from '../../constants/colors.constant';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'drawn-shapes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawn-shapes.component.html',
  styleUrls: ['./drawn-shapes.component.less'],
})
export class DrawnShapesComponent implements OnInit {
  constructor(private shapeService: ShapeService) {
    this.lines = this.shapeService.lines;
  }

  public selectedShape: Shape | null = null;
  public colors: Color[] = Object.values(SystemColors);
  public shapes: Shape[] = [];
  public lines: Line[][] = [];

  public ngOnInit(): void {
    if (this.lines) {
      this.createShapeObjects();
    }
  }

  // Function that creates shape objects from given line collections
  public createShapeObjects() {
    this.lines.forEach((lineCollection) => {
      const shape: Shape = {
        id: Math.random().toString(36).substr(2, 9),
        lines: lineCollection,
        selected: false,
        color: SystemColors.Default,
      };
      this.shapes.push(shape);
    });
  }

  // Function that toggles the selection of a shape and deselects the other shapes
  public toggleSelection(shape: Shape) {
    shape.selected = !shape.selected;

    if (this.selectedShape) {
      this.selectedShape.selected = false;
    }

    this.selectedShape === shape
      ? (this.selectedShape = null)
      : (this.selectedShape = shape);
    console.log(shape.id + 'is selected');
  }

  // Function that sets the color of the selected shape
  public setColor(color: string): void {
    if (this.selectedShape) {
      this.selectedShape.color = color;
    }
    console.log(this.selectedShape?.id + 'painted ' + color);
  }

  // Decides the width of the svg element
  public getSvgWidth(shape: Shape): string {
    const maxX: number = Math.max(
      ...shape.lines.map((line) => Math.max(+line.fromX, +line.toX)) // + for converting string to number
    );
    let res = maxX + 2; // +2 for padding
    return res.toString();
  }

  // Decides the height of the svg element
  public getSvgHeight(shape: Shape): string {
    const maxY: number = Math.max(
      ...shape.lines.map((line) => Math.max(+line.fromY, +line.toY))
    );
    let res = maxY + 2;
    return res.toString(); // +2 for padding
  }

  public getSvgPath(shape: Shape): string {
    let res = '';
    shape.lines.forEach((line) => {
      res += `M ${line.fromX} ${line.fromY} L ${line.toX} ${line.toY} `;
    });
    return res;
  }

  public saveShapesData(): void {
    let shapesData = JSON.stringify(this.shapes);

    // Download the JSON data as a file
    // const blob = new Blob([shapesData], { type: 'application/json' });
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'shapesData.json';
    // link.click();
    // URL.revokeObjectURL(url);

    // Save the JSON data to local storage
    localStorage.setItem('shapesData', shapesData);
  }

  public loadShapesData(): void {
    this.shapes = [];

    // Load the shapes from a file
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.accept = 'application/json';
    // input.onchange = (event) => {
    //   const target = event.target as HTMLInputElement;
    //   const file: File = (target.files as FileList)[0];
    //   const reader = new FileReader();
    //   reader.readAsText(file);
    //   reader.onload = () => {
    //     const shapesData = reader.result as string;
    //     const shapes = JSON.parse(shapesData);
    //     shapes.forEach((shape: Shape) => {
    //       this.shapes.push(shape);
    //     });
    //   };
    // };
    // input.click();

    // Load the shapes from local storage
    const shapesData = localStorage.getItem('shapesData');
    if (shapesData) {
      const shapes = JSON.parse(shapesData);
      shapes.forEach((shape: Shape) => {
        this.shapes.push(shape);
      });
    }
  }
}
