import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private api: ApiService) {}

  getCart(): Observable<CartItem[]> {
    const userId = 1; // Mock user ID since we don't have user context
    return this.api.get<CartItem[]>(`/cart/user/${userId}`);
  }

  addToCart(productId: number, quantity: number = 1, price: number = 0): Observable<any> {
    const userId = 1; // Mock user ID
    return this.api.post('/cart/add', { userId, productId, quantity, price });
  }

  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.api.put(`/cart/${itemId}`, { quantity });
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.api.delete(`/cart/${itemId}`);
  }

  clearCart(): Observable<any> {
    const userId = 1; // Mock user ID
    return this.api.delete(`/cart/user/${userId}`);
  }
}