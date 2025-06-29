import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'products', 
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
  },
  { path: '**', redirectTo: '/products' }
];