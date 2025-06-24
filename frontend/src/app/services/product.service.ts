import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product, ProductCreateRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {}

  getAllProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>('/products');
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(`/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.apiService.get<Product[]>(`/products/category/${category}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.apiService.get<Product[]>(`/products/search?q=${query}`);
  }

  createProduct(product: ProductCreateRequest): Observable<Product> {
    return this.apiService.post<Product>('/products', product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.apiService.put<Product>(`/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.apiService.get<string[]>('/products/categories');
  }
}