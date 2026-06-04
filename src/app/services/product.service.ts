import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.backend_url}products`;

    getProducts(page: number, limit: number, query: string = ''): Observable<ProductResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        if (query) {
            params = params.set('q', query);
        }

        return this.http.get<ProductResponse>(this.apiUrl, { params });
    }

    decreaseStock(sku: string, amount: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${sku}/decrease-stock`, { amount });
    }

    pruebaApi(): Observable<any> {
        const payLoad = {
          "to": "lobito.maestro@gmail.com",
          "subject": "prueba asunto",
          "text": "Contenido en texto plano para prueba mirar......",
          "html": "<p>This is the <b>HTML version</b> of the email.</p>"
        }
        return this.http.post(`${environment.awsLambdaUrl}send-email`, payLoad);
    }

    pruebaApi2(): Observable<any> {
        return this.http.get(`https://tucotizadordev.metaldom.com/rd/api/v1/families?CustomerCode=51543`);
    }

    pruebaApi3(): Observable<any> {
        return this.http.post(`https://tucotizadordev.metaldom.com/rd/api/v1/portal-customers/authorization-portal/health-check`, {});
    }

}
