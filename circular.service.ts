import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CircularDetails } from './circulardetails.service';

@Injectable({
  providedIn: 'root'
})
export class CircularService {
cir: Observable<CircularDetails>[];
private baseUrl = 'http://localhost:8082/staffCircular/api/details'
  constructor(private http: HttpClient) { }

  
  addCir(CircularDetails: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/add`, CircularDetails);
  }
  getCircularDetailsList(): any {
    return this.http.get(`${this.baseUrl}/list`)
  }


  ackDetails(circularId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/ack/${circularId}`, { responseType: 'text' });
  }
}
