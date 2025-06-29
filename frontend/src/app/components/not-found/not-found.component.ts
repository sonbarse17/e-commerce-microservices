import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="not-found-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Page Not Found</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>The page you're looking for doesn't exist yet.</p>
          <p>This feature is coming soon!</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/products">
            Back to Products
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }
  `]
})
export class NotFoundComponent {}