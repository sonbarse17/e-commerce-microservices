import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="product-list-container">
      <div class="filters">
        <mat-form-field>
          <mat-label>Search Products</mat-label>
          <input matInput [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="Search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategory" (selectionChange)="onCategoryChange()">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories" [value]="category">
              {{category}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <mat-grid-list cols="4" rowHeight="400px" gutterSize="16px">
        <mat-grid-tile *ngFor="let product of filteredProducts">
          <mat-card class="product-card">
            <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
            <mat-card-header>
              <mat-card-title>{{product.name}}</mat-card-title>
              <mat-card-subtitle>{{product.brand}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p class="price">\${{product.price}}</p>
              <p class="rating">
                <mat-icon>star</mat-icon>
                {{product.rating}} ({{product.reviewCount}} reviews)
              </p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button [routerLink]="['/products', product.id]">View Details</button>
              <button mat-raised-button color="primary" (click)="addToCart(product)">
                <mat-icon>add_shopping_cart</mat-icon>
                Add to Cart
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 20px;
    }
    .filters {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .product-card {
      width: 100%;
      height: 380px;
    }
    .price {
      font-size: 1.2em;
      font-weight: bold;
      color: #2e7d32;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchQuery = '';
  selectedCategory = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: error => console.error('Error loading products:', error)
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: categories => this.categories = categories,
      error: error => console.error('Error loading categories:', error)
    });
  }

  onSearch() {
    this.filterProducts();
  }

  onCategoryChange() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => console.log('Added to cart:', product.name),
      error: error => console.error('Error adding to cart:', error)
    });
  }
}