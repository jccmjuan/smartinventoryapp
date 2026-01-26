import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private apiUrl = 'http://localhost:3000/products';

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
}
