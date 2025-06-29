import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'products', 
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  { 
    path: 'products/:id', 
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: '/products' }
];