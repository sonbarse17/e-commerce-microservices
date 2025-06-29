import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private api: ApiService) {}

  processPayment(paymentData: any): Observable<Payment> {
    return this.api.post<Payment>('/payments/process', paymentData);
  }

  getPayment(id: number): Observable<Payment> {
    return this.api.get<Payment>(`/payments/${id}`);
  }

  getPaymentsByOrder(orderId: number): Observable<Payment[]> {
    return this.api.get<Payment[]>(`/payments/order/${orderId}`);
  }

  refundPayment(paymentId: number): Observable<any> {
    return this.api.post(`/payments/${paymentId}/refund`, {});
  }
}