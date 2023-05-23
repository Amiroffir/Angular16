import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawnShapesComponent } from './shape/components/drawn-shapes/drawn-shapes.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { menuItems } from './shape/constants/menuItems.constants';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, DrawnShapesComponent, PanelMenuModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  public ngOnInit() {
    this.items = menuItems;
  }
}
