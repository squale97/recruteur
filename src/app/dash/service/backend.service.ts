import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  getData(urlSuffix): Observable<any> {
    return this.http.get<any>(environment.baseUrl+urlSuffix);
  }
  
  PostData(urlSuffix, body): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(environment.baseUrl+urlSuffix, body, {headers})
  }
}