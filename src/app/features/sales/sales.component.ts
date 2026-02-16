import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductMockService } from './product-mock.service';
import { ProductDetail } from './product-detail.interface';
import { SearchItem } from './search-item.interface';
import { ContentEditDetailComponent } from './content-detail/content-edit-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, ContentEditDetailComponent, MatTooltipModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  private productService = inject(ProductMockService);

  searchTerm = signal('');
  showDropdown = signal(false);
  searchResults = signal<SearchItem[]>([]);
  selectedItem = signal<SearchItem | null>(null);
  selectedProductDetail = signal<ProductDetail | null>(null);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const term = input.value;
    this.searchTerm.set(term);
    this.showDropdown.set(true);

    this.productService.searchProducts(term).subscribe(results => {
      this.searchResults.set(results);
    });
  }

  selectItem(item: SearchItem) {
    this.selectedItem.set(item);
    this.searchTerm.set(item.title);
    this.showDropdown.set(false);

    this.productService.getProduct(item.id).subscribe(detail => {
      this.selectedProductDetail.set(detail);
    });
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown.set(false);
    }, 200);
  }

  onFocus() {
    this.showDropdown.set(true);
    this.productService.searchProducts(this.searchTerm()).subscribe(results => {
      this.searchResults.set(results);
    });
  }

  clearSearch() {
    this.searchTerm.set('');
    this.selectedItem.set(null);
    this.selectedProductDetail.set(null);
    this.searchResults.set([]);
    this.showDropdown.set(false);
  }
}
