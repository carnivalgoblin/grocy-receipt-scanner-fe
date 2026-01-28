import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GrocyProduct {
  id: string;
  name: string;
}

export interface ScannedItem {
  ocrName: string;
  grocyId: string;
  grocyName: string;
  amount: number;
  price: number;
  matchInfo: string;
}

@Injectable({ providedIn: 'root' })
export class ScanService {
  // Relativer Pfad! Nginx leitet das an das Backend weiter.
  private apiUrl = '/api/scan';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<GrocyProduct[]> {
    return this.http.get<GrocyProduct[]>(`${this.apiUrl}/products`);
  }

  uploadBon(file: File): Observable<ScannedItem[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ScannedItem[]>(`${this.apiUrl}/upload`, formData);
  }

  submitBooking(items: ScannedItem[], shop: string) {
    const body = {
      shop: shop,
      items: items
    };

    return this.http.post(this.apiUrl + '/book', body, { responseType: 'text' });
  }
}
