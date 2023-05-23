import { Line } from './line.interface';

export interface Shape {
  id: string;
  lines: Line[];
  selected: boolean;
  color: string;
}
