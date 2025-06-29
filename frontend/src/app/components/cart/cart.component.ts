import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <div class="cart-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Shopping Cart</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div *ngIf="loading">Loading cart...</div>
          <div *ngIf="!loading && cartItems.length === 0">Your cart is empty</div>
          
          <mat-list *ngIf="!loading && cartItems.length > 0">
            <mat-list-item *ngFor="let item of cartItems">
              <div class="cart-item">
                <span>{{item.productName}}</span>
                <span>Qty: {{item.quantity}}</span>
                <span>\${{item.price}}</span>
                <button mat-icon-button (click)="removeItem(item.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </mat-list-item>
          </mat-list>
          
          <div *ngIf="cartItems.length > 0" class="total">
            <strong>Total: \${{getTotal()}}</strong>
          </div>
        </mat-card-content>
        
        <mat-card-actions *ngIf="cartItems.length > 0">
          <button mat-raised-button color="primary">Checkout</button>
          <button mat-button (click)="clearCart()">Clear Cart</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .total {
      text-align: right;
      margin-top: 20px;
      font-size: 1.2em;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: items => {
        this.cartItems = items;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading cart:', error);
        this.loading = false;
      }
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => this.loadCart(),
      error: error => console.error('Error removing item:', error)
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => this.loadCart(),
      error: error => console.error('Error clearing cart:', error)
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}