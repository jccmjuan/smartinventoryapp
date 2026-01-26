import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ha ocurrido un error inesperado';

            if (error.error instanceof ErrorEvent) {
                
                errorMessage = `Error: ${error.error.message}`;
            } else {
                
                
                errorMessage = error.error?.message || `Código de error: ${error.status}`;
            }

            
            notificationService.error(errorMessage);

            
            return throwError(() => error);
        })
    );
};
