import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
  orderDate: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private api: ApiService) {}

  createOrder(orderData: any): Observable<Order> {
    return this.api.post<Order>('/orders', orderData);
  }

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('/orders');
  }

  getOrder(id: number): Observable<Order> {
    return this.api.get<Order>(`/orders/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.api.put(`/orders/${id}/status`, { status });
  }

  cancelOrder(id: number): Observable<any> {
    return this.api.put(`/orders/${id}/cancel`, {});
  }
}