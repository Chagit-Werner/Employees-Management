import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { EmployeeFormService } from '../../services/employee-form.service';
import { Position } from '../../models/position.model';
import { Employee, Gender, } from '../../models/employee.model';
import { AddEditModule } from '../../modules/add-edit.module';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [AddEditModule],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
    employeeForm: FormGroup | any;
    positions: Position[] = [];

    @Input()
    employee!: Employee;//מקבלים את תוכן העובד בשביל למלא שדות ברירת מחדל בעריכה.

    constructor(
        private fb: FormBuilder,
        private Ro: Router,
        private _snackBar: MatSnackBar,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private employeeService: EmployeeService,
        private positionService: PositionService,
        private employeeFormService: EmployeeFormService,
    ) { }

    ngOnInit(): void {
        this.employee = this.config.data.employee;
        this.initEmployeeForm();
        this.employee != null ? this.employeeForm.patchValue({
            ...this.employee,
            gender: this.employee?.gender === 0 ? 'Male' : 'Female'
        }) : '';//אתחול הערכים הדיפולטוביים בעריכה.
        this.employeeForm.updateValueAndValidity();
        this.loadPositions();
    }

    initEmployeeForm(): void {
        this.employeeForm = this.fb.group({
            iD_Number: ['', [Validators.required, this.isValidIdNumber]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            birthDate: ['', [Validators.required]],
            startWorking: ['', Validators.required,],
            employeeInPositions: this.fb.array([], Validators.required)
        });

        if (this.employee?.employeeInPositions.length > 0) {
            //מילוי הערכים הדיפולטיביים במערך התפקידים.
            const positionsFormArray = this.employeeForm.get('employeeInPositions') as FormArray;
            positionsFormArray.clear();
            this.employee.employeeInPositions.forEach(position => {
                positionsFormArray.push(this.fb.group({
                    positionId: [position.positionId, Validators.required],
                    administrative: [position.administrative],
                    startPosition: [position.startPosition]

                }));
            });
            this.employeeForm.updateValueAndValidity();
        }
    }
    loadPositions(): void {
        this.positionService.getPositions().subscribe(positions => {
            this.positions = positions;
        });
    }
    getEmployeeInPositions() {
        return this.employeeForm.get('employeeInPositions') as FormArray;
    }

    submit() {
        //פונקצית הוספה/ עריכה לפי העניין
        this.getInvalidControls();
        if (this.employeeForm.valid) {
            const formData = this.employeeForm.value;
            formData.gender = this.employeeForm.gender == Gender.Male ? 0 : 1

            if (this.employee) {
                formData.id = this.employee.id
                //הפניה לפונקצית עריכה
                this.editEmployee(formData);
            }
            else {
                //הפניה לפונקצית הוספה
                this.addEmployee(formData);
            }
        }
    }

    addEmployee(formData: {}) {
        this.employeeService.addEmployee(formData).subscribe(
            () => {
                this.openSnackBar('employee was added successfully!');
                this.ref.close();
              // פונקציה המיועדת לעדכן את הטבלה בשינויים 
                this.employeeFormService.submitForm();
            },
            error => {
                if (error.error.errors) {
                    const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
                    this.openErrorSnackBar(errorMessage);
                } else {
                    this.openErrorSnackBar('An error occurred while adding employee.');
                }
            }
        );
    }

    editEmployee(formData: {}) {

        this.employeeService.editEmployee(formData).subscribe(
            next => {
                this.openSnackBar('Employee was updated successfully');
                this.ref.close();
                this.employeeFormService.submitForm();
            },
            error => {
                if (error.error.errors) {
                    const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
                    this.openErrorSnackBar(errorMessage);
                } else {
                    this.openErrorSnackBar('An error occurred while updating employee.');
                }
            }
        );
    }

    addPositionControl(): void {
        console.log("See", this.positionsFormArray);

        this.employeeForm.get('employeeInPositions').push(this.fb.group({
            positionId: ['', Validators.required],
            administrative: [false],
            startPosition: [null, [Validators.required, this.entryDateValidator()]]
        }));

    }

    removePositionControl(index: number): void {
        this.positionsFormArray.removeAt(index);
    }

    get positionsFormArray(): FormArray {

        return this.employeeForm.get('employeeInPositions') as FormArray;
    }
 
    //Snack Bars:
    openErrorSnackBar(message: string): void {
        this._snackBar.open(message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
        });
    }

    openSnackBar(message: string) {
        const snackBarRef = this._snackBar.open(message, undefined, {
            duration: 2000,
            panelClass: ['custom-snackbar']
        });
    }

    //Validation Methods:

      //פונקציה הבודקת האם הטופס ולידי 
    //אם הטופס לא ולידי המשתמש יקבל הודעה מסודרת אלו שדות אינם ממולאים כנדרש
    //חוץ מה-error messages שיופיעו בכל מקרה.
    getInvalidControls(): string[] {
        const invalidControls: string[] = [];
        const controls = this.employeeForm.controls;

        for (const controlName in controls) {
            if (controls.hasOwnProperty(controlName)) {
                const control = this.employeeForm.get(controlName);
                if (control && control.invalid) {
                    invalidControls.push(controlName);
                }
            }
        }
        const positionsArray = this.employeeForm.get('employeeInPositions') as FormArray;
        for (let i = 0; i < positionsArray.length; i++) {
            const positionGroup = positionsArray.at(i) as FormGroup;
            const positionControls = positionGroup.controls;
            for (const controlName in positionControls) {
                if (positionControls.hasOwnProperty(controlName)) {
                    const control = positionGroup.get(controlName);
                    if (control && control.invalid) {
                        invalidControls.push(`employeeInPositions[${i}].${controlName}`);
                    }
                }
            }
        }

        if (invalidControls.length > 0) {
            this.openErrorSnackBar('You have errors in fields: ' + invalidControls.join(', '));
        }
        return invalidControls;
    }

    //פונקציה לבדיקת תעודת זהות תקינה
    isValidIdNumber(control: FormControl): { [key: string]: any } | null {
        const idNumber = control.value;

        if (!idNumber || isNaN(Number(idNumber))) {
            return { 'invalidIdNumber': true };
        }
        const checkDigit = Number(idNumber.toString().charAt(8));
        let sum = 0;

        for (let i = 0; i < 8; i++) {
            let digit = Number(idNumber.toString().charAt(i));
            if (i % 2 === 0) {
                digit *= 1;
            } else {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
        if ((sum + checkDigit) % 10 === 0)
            return null;
        else
            return { 'invalidIdNumber': true };
    }

    entryDateValidator() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const entryDate = new Date(control.value);
            const startOfWorkDate = new Date(this.employeeForm.get('startWorking')?.value);
            return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
        };
    }

    isPositionDisabled(positionId: number, index: number): boolean {
        const selectedPositions = this.employeeForm.value.employeeInPositions.map((pos: any) => pos.positionId);
        return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
    }
}
