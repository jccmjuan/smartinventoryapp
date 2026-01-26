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
    close = output<boolean>(); 

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
            
            this.errorMessage.set('La cantidad debe ser mayor a 0');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        
        this.productService.decreaseStock(this.product().sku, this.decreaseAmount())
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.notificationService.success('Stock actualizado correctamente');
                    this.close.emit(true);
                },
                error: (err) => {
                    
                    this.isLoading.set(false);
                }
            });
    }
}
