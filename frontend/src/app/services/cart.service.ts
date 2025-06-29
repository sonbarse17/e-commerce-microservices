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
    return this.api.get<CartItem[]>('/cart');
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.api.post('/cart/add', { productId, quantity });
  }

  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.api.put(`/cart/update/${itemId}`, { quantity });
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.api.delete(`/cart/remove/${itemId}`);
  }

  clearCart(): Observable<any> {
    return this.api.delete('/cart/clear');
  }
}