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
      <!-- Hero Section -->
      <div class="hero-section">
        <h1 class="hero-title">Discover Amazing Products</h1>
        <p class="hero-subtitle">Find everything you need in our curated collection</p>
      </div>

      <!-- Loading Animation -->
      <div *ngIf="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading amazing products...</p>
      </div>
      
      <!-- Error State -->
      <div *ngIf="error" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <p class="error-text">{{error}}</p>
        <button mat-raised-button color="primary" (click)="loadProducts()" class="retry-btn">
          <mat-icon>refresh</mat-icon>
          Try Again
        </button>
      </div>
      
      <!-- Filters -->
      <div *ngIf="!loading && !error" class="filters-container">
        <div class="filters">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search Products</mat-label>
            <input matInput [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="What are you looking for?">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="category-field">
            <mat-label>Category</mat-label>
            <mat-select [(ngModel)]="selectedCategory" (selectionChange)="onCategoryChange()">
              <mat-option value="">All Categories</mat-option>
              <mat-option *ngFor="let category of categories" [value]="category">
                {{category}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        
        <div class="results-count" *ngIf="filteredProducts.length > 0">
          {{filteredProducts.length}} products found
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" *ngIf="!loading && !error">
        <div class="product-card" *ngFor="let product of filteredProducts; trackBy: trackByProduct">
          <div class="card-image">
            <img [src]="product.imageUrl" [alt]="product.name" loading="lazy">
            <div class="card-overlay">
              <button mat-fab color="primary" (click)="addToCart(product)" class="add-to-cart-fab">
                <mat-icon>add_shopping_cart</mat-icon>
              </button>
            </div>
          </div>
          
          <div class="card-content">
            <div class="product-brand">{{product.brand}}</div>
            <h3 class="product-name">{{product.name}}</h3>
            <p class="product-description">{{product.description}}</p>
            
            <div class="product-rating">
              <div class="stars">
                <mat-icon *ngFor="let star of getStars(product.rating)">{{star}}</mat-icon>
              </div>
              <span class="rating-text">{{product.rating}} ({{product.reviewCount}})</span>
            </div>
            
            <div class="product-footer">
              <div class="price">\${{product.price}}</div>
              <div class="stock" [class.low-stock]="product.stock < 10">
                {{product.stock}} in stock
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && filteredProducts.length === 0" class="empty-state">
        <mat-icon class="empty-icon">search_off</mat-icon>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
        <button mat-raised-button color="primary" (click)="clearFilters()">
          Clear Filters
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0;
    }

    .hero-section {
      text-align: center;
      padding: 80px 20px 60px;
      color: white;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 20px;
      animation: fadeInUp 1s ease-out;
      background: linear-gradient(45deg, #fff, #e3f2fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      margin: 0;
      animation: fadeInUp 1s ease-out 0.2s both;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100px 20px;
      color: white;
    }
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    .loading-text {
      font-size: 1.2rem;
      animation: pulse 2s ease-in-out infinite;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 100px 20px;
      color: white;
      text-align: center;
    }
    
    .error-icon {
      font-size: 4rem;
      margin-bottom: 20px;
      color: #ff6b6b;
      animation: shake 0.5s ease-in-out;
    }
    
    .error-text {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    
    .retry-btn {
      animation: bounce 2s infinite;
    }

    .filters-container {
      background: white;
      margin: 0 20px 30px;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      animation: slideInDown 0.6s ease-out;
    }
    
    .filters {
      display: flex;
      gap: 30px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .search-field, .category-field {
      flex: 1;
      min-width: 250px;
    }
    
    .results-count {
      color: #666;
      font-weight: 500;
      font-size: 1.1rem;
      animation: fadeIn 0.5s ease;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
      padding: 0 20px 50px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .product-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      animation: fadeInUp 0.6s ease-out;
      position: relative;
      transform-origin: center;
    }
    
    .product-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0,0,0,0.2);
    }
    
    .card-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    .product-card:hover .card-image img {
      transform: scale(1.1) rotate(1deg);
    }
    
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.4s ease;
      backdrop-filter: blur(5px);
    }
    
    .product-card:hover .card-overlay {
      opacity: 1;
    }
    
    .add-to-cart-fab {
      transform: scale(0.7) rotate(-10deg);
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .product-card:hover .add-to-cart-fab {
      transform: scale(1.1) rotate(0deg);
    }
    
    .card-content {
      padding: 25px;
    }
    
    .product-brand {
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      opacity: 0.8;
    }
    
    .product-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0 0 10px;
      color: #333;
      line-height: 1.3;
      transition: color 0.3s ease;
    }
    
    .product-card:hover .product-name {
      color: #667eea;
    }
    
    .product-description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0 0 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .stars {
      display: flex;
      gap: 2px;
    }
    
    .stars mat-icon {
      font-size: 1.2rem;
      color: #ffc107;
      transition: transform 0.2s ease;
    }
    
    .product-card:hover .stars mat-icon {
      transform: scale(1.1);
    }
    
    .rating-text {
      color: #666;
      font-size: 0.9rem;
    }
    
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2e7d32;
      transition: all 0.3s ease;
    }
    
    .product-card:hover .price {
      transform: scale(1.05);
      color: #1b5e20;
    }
    
    .stock {
      color: #4caf50;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 12px;
      background: rgba(76, 175, 80, 0.1);
    }
    
    .stock.low-stock {
      color: #ff9800;
      background: rgba(255, 152, 0, 0.1);
    }

    .empty-state {
      text-align: center;
      padding: 100px 20px;
      color: white;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 20px;
      opacity: 0.7;
      animation: float 3s ease-in-out infinite;
    }
    
    .empty-state h3 {
      font-size: 1.5rem;
      margin: 0 0 10px;
    }
    
    .empty-state p {
      opacity: 0.8;
      margin-bottom: 30px;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -10px, 0);
      }
      70% {
        transform: translate3d(0, -5px, 0);
      }
      90% {
        transform: translate3d(0, -2px, 0);
      }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .filters {
        flex-direction: column;
        gap: 20px;
      }
      
      .products-grid {
        grid-template-columns: 1fr;
        padding: 0 15px 30px;
      }
      
      .product-card:hover {
        transform: translateY(-8px) scale(1.01);
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchQuery = '';
  selectedCategory = '';
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.error = '';
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading products:', error);
        this.error = 'Failed to load products. Backend services may still be starting up.';
        this.loading = false;
      }
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

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    while (stars.length < 5) {
      stars.push('star_border');
    }
    
    return stars;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filterProducts();
  }
}