import { Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { authGuard } from './guards/common/auth.guard';


export const routes: Routes = 
[
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
        { path: '', loadComponent: () => import('./admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent) ,canActivate:[authGuard]},
        { path: 'customers', loadComponent: () => import('./admin/components/customers/customers.component').then(m => m.CustomersComponent) ,canActivate:[authGuard]},
        { path: 'orders', loadComponent: () => import('./admin/components/orders/orders.component').then(m => m.OrdersComponent) ,canActivate:[authGuard]},
        { path: 'products', loadComponent: () => import('./admin/components/products/products.component').then(m => m.ProductsComponent),canActivate:[authGuard] },
        

        ],canActivate:[authGuard]
    },
    { path: '', loadComponent: () => import('./ui/components/home/home.component').then(m => m.HomeComponent) },
    { path: 'basket', loadComponent: () => import('./ui/components/baskets/baskets.component').then(m => m.BasketsComponent) },
    { path: 'product', loadComponent: () => import('./ui/components/product/product.component').then(m => m.ProductComponent) },
    { path: 'register', loadComponent: () => import('./ui/components/register/register.component').then(m => m.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./ui/components/login/login.component').then(m => m.LoginComponent) },


];
