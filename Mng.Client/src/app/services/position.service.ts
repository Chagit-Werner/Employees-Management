import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient) { }
  baseUrl='https://localhost:7124/api/'
  getPositions(): Observable<any> {
    return  this.http.get(`${this.baseUrl}Position`)
  }
}
