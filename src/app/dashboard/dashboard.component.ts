import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../services/product.service';
import { Paginator } from "../shared/paginator/paginator.component";
import { EditProductComponent } from './edit-product/edit-product.component';


@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, Paginator, EditProductComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    private productService = inject(ProductService);

    products = signal<Product[]>([]);
    total = signal(0);
    page = signal(1);
    limit = signal(10);
    searchTerm = signal('');
    loading = signal(false);
    selectedProduct = signal<Product | null>(null);



    constructor() { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.loading.set(true);
        this.productService.getProducts(this.page(), this.limit(), this.searchTerm())
            .subscribe({
                next: (res) => {
                    this.products.set(res.data);
                    this.total.set(res.total);
                    this.loading.set(false);
                },
                error: (err) => {
                    console.error('Error loading products', err);
                    this.loading.set(false);
                }
            });
    }

    onSearch(term: string) {
        this.searchTerm.set(term);
        this.page.set(1); // Reset to first page on search
        this.loadProducts();
    }

    onPageChange(newPage: number) {
        this.page.set(newPage);
        this.loadProducts();
    }

    onEditProduct(product: Product) {
        this.selectedProduct.set(product);
    }

    onCloseEdit(updated: boolean) {
        this.selectedProduct.set(null);
        if (updated) {
            this.loadProducts();
        }
    }
}
