import { Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';


export const routes: Routes = 
[
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
        { path: '', loadComponent: () => import('./admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
        { path: 'customers', loadComponent: () => import('./admin/components/customers/customers.component').then(m => m.CustomersComponent) },
        { path: 'orders', loadComponent: () => import('./admin/components/orders/orders.component').then(m => m.OrdersComponent) },
        { path: 'products', loadComponent: () => import('./admin/components/products/products.component').then(m => m.ProductsComponent) },
        

        ]
    },
    { path: '', loadComponent: () => import('./ui/components/home/home.component').then(m => m.HomeComponent) },
    { path: 'basket', loadComponent: () => import('./ui/components/baskets/baskets.component').then(m => m.BasketsComponent) },
    { path: 'product', loadComponent: () => import('./ui/components/product/product.component').then(m => m.ProductComponent) },


];
