import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { PrimeNgModule } from '../../modules/PrimeNgModule';
import { constant } from '../../../constant';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormService } from '../../services/employee-form.service';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';



@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    FormsModule, PrimeNgModule, DatePipe],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
  providers: [MessageService, ConfirmationService, DialogService]
})

export class EmployeeTableComponent {

  productDialog!: boolean;
  employees!: Employee[];
  filteredEmployees!: Employee[];
  employee!: Employee;
  selectedEmployees!: Employee[];
  private formSubmittedSubscription: Subscription;
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private employeeFormService: EmployeeFormService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
      
    //כאן מרפרשים את הטבלה אחרי עדכון/ הוספה של עובד.
    this.formSubmittedSubscription = this.employeeFormService.formSubmitted$.subscribe(() => {
      this.loadEmployees();
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: (res) => {
          this.employees = res;
          //מעבירים את התוצאה לרשימה נוספת שלמעשה היא  זאת שתוצג בטבלה
          this.filteredEmployees = [...this.employees]

        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home'])
  }

  openDialog(employee: Employee | undefined) {
    let ref = this.dialogService.open(
      EmployeeFormComponent, {
      data: {
        employee: employee
      },
    });
    ref.onClose.subscribe((isAccept) => {
    })
  }

  openNew() {
    this.openDialog(undefined);
  }

  editEmployee(e: Employee) {
    this.employee = { ...e };
    this.openDialog(e)
  }

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + employee.firstName + " " + employee.lastName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(employee.id)
          .subscribe({
            next: (res) => {
              this.filteredEmployees = this.filteredEmployees.filter(e => e.id !== employee.id);
              console.log("Employee deleted successfully.");
            },
            error: (error) => {
              console.error(error);
            }
          });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
      }
    });
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.filteredEmployees = this.filteredEmployees.filter(val => !this.selectedEmployees.includes(val));
        this.selectedEmployees.forEach(employee => {
          this.deleteEmployee(employee);
        });
        this.selectedEmployees = []
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'employees Deleted', life: 3000 });
      }
    });
  }

  exportToExcel(): void {
    const data = this.employees.map(employee => ({
      Id_Nmber: employee.iD_Number,
      FirstName: employee.firstName,
      LastName: employee.lastName,
      Gender: employee.gender == 0 ? 'Male' : 'Female',
      DateofBirth: this.formatDate(employee.birthDate),
      StartWorking: this.formatDate(employee.startWorking),
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelData, constant.fileName);
  }

  private formatDate(date: Date): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(filterValue) ||
      employee.lastName.toLowerCase().includes(filterValue) ||
      employee.iD_Number.toLowerCase().includes(filterValue) ||
      employee.startWorking.toString().toLowerCase().includes(filterValue)
    );
  }

}
