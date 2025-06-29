import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Analytics {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: ProductAnalytics[];
  salesByMonth: SalesData[];
}

export interface ProductAnalytics {
  productId: number;
  productName: string;
  totalSold: number;
  revenue: number;
}

export interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private api: ApiService) {}

  getDashboardData(): Observable<Analytics> {
    return this.api.get<Analytics>('/analytics/dashboard');
  }

  getSalesReport(startDate: string, endDate: string): Observable<SalesData[]> {
    return this.api.get<SalesData[]>(`/analytics/sales?start=${startDate}&end=${endDate}`);
  }

  getTopProducts(limit: number = 10): Observable<ProductAnalytics[]> {
    return this.api.get<ProductAnalytics[]>(`/analytics/top-products?limit=${limit}`);
  }

  getUserAnalytics(): Observable<any> {
    return this.api.get('/analytics/users');
  }

  trackEvent(event: string, data: any): Observable<any> {
    return this.api.post('/analytics/track', { event, data });
  }
}