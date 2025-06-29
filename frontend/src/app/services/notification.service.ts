import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private api: ApiService) {}

  getNotifications(): Observable<Notification[]> {
    return this.api.get<Notification[]>('/notifications');
  }

  markAsRead(id: number): Observable<any> {
    return this.api.put(`/notifications/${id}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.api.put('/notifications/read-all', {});
  }

  deleteNotification(id: number): Observable<any> {
    return this.api.delete(`/notifications/${id}`);
  }

  sendNotification(notification: Partial<Notification>): Observable<any> {
    return this.api.post('/notifications/send', notification);
  }
}