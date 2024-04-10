import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFormService {
  private formSubmittedSource = new Subject<void>();

  formSubmitted$ = this.formSubmittedSource.asObservable();

  submitForm(): void {
    this.formSubmittedSource.next();
  }
}
