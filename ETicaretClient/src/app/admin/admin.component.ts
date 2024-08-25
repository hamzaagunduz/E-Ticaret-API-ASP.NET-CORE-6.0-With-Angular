import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,LayoutComponent,ComponentsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
