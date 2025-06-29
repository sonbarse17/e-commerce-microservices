import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <nav class="modern-navbar">
      <div class="nav-container">
        <div class="nav-brand" routerLink="/products">
          <mat-icon class="brand-icon">shopping_bag</mat-icon>
          <span class="brand-text">ShopHub</span>
        </div>
        
        <div class="nav-links">
          <button mat-button routerLink="/products" routerLinkActive="active" class="nav-btn">
            <mat-icon>store</mat-icon>
            <span>Products</span>
          </button>
          
          <button mat-button routerLink="/cart" routerLinkActive="active" class="nav-btn cart-btn">
            <mat-icon matBadge="0" matBadgeColor="accent">shopping_cart</mat-icon>
            <span>Cart</span>
          </button>
          
          <button mat-button [matMenuTriggerFor]="userMenu" class="nav-btn user-btn">
            <mat-icon>account_circle</mat-icon>
            <span>Account</span>
          </button>
        </div>
      </div>
      
      <mat-menu #userMenu="matMenu" class="user-menu">
        <button mat-menu-item routerLink="/login">
          <mat-icon>login</mat-icon>
          <span>Login</span>
        </button>
        <button mat-menu-item routerLink="/register">
          <mat-icon>person_add</mat-icon>
          <span>Register</span>
        </button>
        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </nav>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .modern-navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      height: 70px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .nav-brand:hover {
      transform: scale(1.05);
    }
    
    .brand-icon {
      font-size: 2rem;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .brand-text {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .nav-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 25px;
      transition: all 0.3s ease;
      color: #666;
      font-weight: 500;
    }
    
    .nav-btn:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      transform: translateY(-2px);
    }
    
    .nav-btn.active {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .cart-btn mat-icon {
      position: relative;
    }
    
    .main-content {
      min-height: calc(100vh - 70px);
    }
    
    ::ng-deep .user-menu {
      margin-top: 10px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
    
    ::ng-deep .user-menu .mat-mdc-menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      transition: all 0.2s ease;
    }
    
    ::ng-deep .user-menu .mat-mdc-menu-item:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }
    
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 20px;
      }
      
      .nav-btn span {
        display: none;
      }
      
      .brand-text {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'E-Commerce Platform';

  logout() {
    localStorage.removeItem('token');
    console.log('User logged out');
  }
}