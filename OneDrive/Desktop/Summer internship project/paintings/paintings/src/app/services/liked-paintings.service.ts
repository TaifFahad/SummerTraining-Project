import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikedPaintingsService {
  private apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pKSoTbGzFhj5RtoeFQif/likes'; // API URL for likes

  constructor(private http: HttpClient) {}

  // Fetch likes for a specific painting
  getLikes(objectID: number): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}?item_id=${objectID}`).pipe(
      map((response: any[]) => response.length), // Assuming response is an array of likes
      catchError(error => {
        console.error('Error fetching likes:', error);
        return of(0); // Return 0 in case of error
      })
    );
  }

  // Add a like for a specific painting
  addLike(objectID: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { item_id: objectID };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(error => {
        console.error('Error adding like:', error);
        return of(null); // Return null in case of error
      })
    );
  }
}
