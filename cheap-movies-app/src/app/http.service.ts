import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl :string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  performGet(urlSuffix) : Observable<any>{
    return this.http.get(this.baseUrl+urlSuffix);
  }
}
