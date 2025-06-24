import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User, LoginRequest, RegisterRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCurrentUser();
  }

  register(request: RegisterRequest): Observable<User> {
    return this.apiService.post<User>('/users/register', request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/users/login', request)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.loadCurrentUser();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('/users/me');
  }

  updateProfile(userId: number, data: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`/users/${userId}`, data);
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe({
        next: user => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}