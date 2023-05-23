import { Routes } from '@angular/router';
import { DrawnShapesComponent } from './shape/components/drawn-shapes/drawn-shapes.component';
import { CreateShapeComponent } from './shape/components/create-shape/create-shape.component';

export const routes: Routes = [
  { path: 'create-shape', component: CreateShapeComponent },
  { path: 'draw-shape', component: DrawnShapesComponent },
];
