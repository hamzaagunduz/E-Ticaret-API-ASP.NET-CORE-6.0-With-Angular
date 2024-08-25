import { Component } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CustomersComponent,DashboardComponent,OrdersComponent,ProductsComponent],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {

}
