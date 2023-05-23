import { Injectable } from '@angular/core';
import { Line } from '../models/line.interface';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  constructor() {}

  // For the sake of simplicity, lines are hard-coded here.
  lines: Line[][] = [
    [
      { fromX: '0', fromY: '10', toX: '100', toY: '100' },
      { fromX: '100', fromY: '100', toX: '200', toY: '100' },
      { fromX: '200', fromY: '100', toX: '200', toY: '200' },
      { fromX: '200', fromY: '200', toX: '100', toY: '200' },
      { fromX: '100', fromY: '200', toX: '10', toY: '100' },
      { fromX: '10', fromY: '100', toX: '0', toY: '10' },
    ],
    [
      { fromX: '0', fromY: '80', toX: '100', toY: '100' },
      { fromX: '100', fromY: '100', toX: '200', toY: '100' },
      { fromX: '200', fromY: '100', toX: '200', toY: '200' },
      { fromX: '200', fromY: '200', toX: '100', toY: '200' },
      { fromX: '100', fromY: '200', toX: '10', toY: '100' },
      { fromX: '10', fromY: '100', toX: '0', toY: '80' },
    ],
  ];
}
