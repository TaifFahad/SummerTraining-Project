// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentService {
//   private apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pKSoTbGzFhj5RtoeFQif/comments'; // Base API URL

//   constructor(private http: HttpClient) {}

//   // Fetch comments for a specific item
//   getComments(itemId: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}?item_id=${itemId}`);
//   }

//   // Add a new comment to a specific item
//   addComment(objectID: number, comment: { username: string; comment: string }): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const body = { item_id: objectID, ...comment };
//     return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
//       catchError(error => {
//         console.error('Error adding comment:', error);
//         return of(null); // Return null in case of error
//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pKSoTbGzFhj5RtoeFQif/comments'; // Base API URL

  constructor(private http: HttpClient) {}

  // Fetch comments for a specific item
  getComments(itemId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?item_id=${itemId}`).pipe(
      catchError(error => {
        console.error('Error fetching comments:', error);
        return of([]); // Return empty array in case of error
      })
    );
  }

  // Add a new comment to a specific item
  addComment(objectID: number, comment: { username: string; comment: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { item_id: objectID, ...comment, date: new Date().toISOString() }; // Add date here if API doesn't add it
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        return of(null); // Return null in case of error
      })
    );
  }
}