import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" readonly>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" readonly>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Address</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="profileForm.invalid || isLoading" class="full-width">
              {{isLoading ? 'Updating...' : 'Update Profile'}}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Mock user data - replace with actual user service call
    const mockUser = {
      username: 'john_doe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      address: '123 Main St'
    };
    this.profileForm.patchValue(mockUser);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      // Mock update - replace with actual service call
      setTimeout(() => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        this.isLoading = false;
      }, 1000);
    }
  }
}