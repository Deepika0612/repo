import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentDetails } from './parentdetails.service';


@Injectable({
  providedIn: 'root'
})
export class ParentService {
  parent: Observable<ParentDetails>[];
  private baseUrl = 'http://localhost:8080/schoolParent/api/details'
  private baseUrlUpdate = 'http://localhost:8081/schoolParentUpdate/api'
  constructor(private http: HttpClient) { }

  getParentDetailsList(): any {
    return this.http.get(`${this.baseUrl}/list`)
  }
  
  doReg(parentDetails: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/add`, parentDetails);
  }
 
  parentUpdate(id: string, parentDetails: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, parentDetails, { responseType: 'text'});
  }

  getParentId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }
  
  approved(id: string, parentDetails: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/approved/${id}`, parentDetails, { responseType: 'text'});
  }

  rejected(id: string, parentDetails: object): Observable<any> {
    return this.http.put(`${this.baseUrlUpdate}/rejected/${id}`, parentDetails, { responseType: 'text'});
  }

  deleteDetails(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
