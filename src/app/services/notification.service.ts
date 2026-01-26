import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor() { }

    showMessage(title: string, text: string, icon: SweetAlertIcon) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#2563eb' // Matching the app's primary color
        });
    }

    success(text: string, title: string = '¡Éxito!') {
        this.showMessage(title, text, 'success');
    }

    error(text: string, title: string = '¡Error!') {
        this.showMessage(title, text, 'error');
    }

    warning(text: string, title: string = 'Advertencia') {
        this.showMessage(title, text, 'warning');
    }
}
