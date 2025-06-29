import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface InventoryItem {
  id: number;
  productId: number;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private api: ApiService) {}

  getInventory(productId: number): Observable<InventoryItem> {
    return this.api.get<InventoryItem>(`/inventory/${productId}`);
  }

  checkAvailability(productId: number, quantity: number): Observable<boolean> {
    return this.api.get<boolean>(`/inventory/${productId}/available?quantity=${quantity}`);
  }

  reserveStock(productId: number, quantity: number): Observable<any> {
    return this.api.post(`/inventory/reserve`, { productId, quantity });
  }

  releaseStock(productId: number, quantity: number): Observable<any> {
    return this.api.post(`/inventory/release`, { productId, quantity });
  }

  updateStock(productId: number, quantity: number): Observable<any> {
    return this.api.put(`/inventory/${productId}`, { quantity });
  }
}