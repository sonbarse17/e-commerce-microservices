import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private api: ApiService) {}

  getProductReviews(productId: number): Observable<Review[]> {
    return this.api.get<Review[]>(`/reviews/product/${productId}`);
  }

  addReview(review: Partial<Review>): Observable<Review> {
    return this.api.post<Review>('/reviews', review);
  }

  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.api.put<Review>(`/reviews/${id}`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.api.delete(`/reviews/${id}`);
  }

  getUserReviews(): Observable<Review[]> {
    return this.api.get<Review[]>('/reviews/user');
  }
}