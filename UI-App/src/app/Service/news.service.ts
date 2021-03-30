import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  getNewsList(): Observable<any[]> {
    console.log('INSIDE geNewsList');
    return this.http.get('http://localhost:3000/allNews').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
