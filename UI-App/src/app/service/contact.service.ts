import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  contactMe(contactData: any): Observable<any[]> {
    console.log('INSIDE Conatct');
    return this.http.post('http://localhost:3000/contact', contactData).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
