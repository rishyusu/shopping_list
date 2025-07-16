import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
    id?: number;
    name: string;
    description: string;
    price: number;
    created_at?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl = 'http://localhost:3000/items';

    constructor(private http: HttpClient) {}

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl);
    }

    addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.apiUrl, item);
    }

    deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
