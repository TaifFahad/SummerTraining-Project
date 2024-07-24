import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetApiService {
  private apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';

  constructor(private http: HttpClient) {}

  searchPaintings(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}&hasImages=true`);
  }

  getPaintingDetails(objectID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/objects/${objectID}`);
  }
  
}



