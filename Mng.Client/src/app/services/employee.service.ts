import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { log } from 'console';
// import { OperationResult } from './operationResult.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:7124/api/'

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}Employee`)
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Employee/${id}`);
  }

  addEmployee(e: any): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}Employee/`, e)
  }

  editEmployee(employee: any): Observable<any> {
    return this.http.put<Employee>(`${this.baseUrl}Employee/${employee.id}`, employee);
  }
}
