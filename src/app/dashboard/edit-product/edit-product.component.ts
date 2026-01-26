import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
    product = input.required<Product>();
    close = output<boolean>(); // Emits true if updated, false if cancelled

    private productService = inject(ProductService);
    private notificationService = inject(NotificationService);

    decreaseAmount = signal<number>(1);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string>('');

    onCancel() {
        this.close.emit(false);
    }

    onConfirm() {
        if (this.decreaseAmount() <= 0) {
            // this is just a local validation, not a server error
            this.errorMessage.set('La cantidad debe ser mayor a 0');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        // descrease stock service call
        this.productService.decreaseStock(this.product().sku, this.decreaseAmount())
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.notificationService.success('Stock actualizado correctamente');
                    this.close.emit(true);
                },
                error: (err) => {
                    // Interceptor handles the alert. We just stop loading.
                    this.isLoading.set(false);
                }
            });
    }
}
