import { EmployeeInPosition } from "./employeeInposition.model";

export enum Gender {
    Male,
    Female
  }
  
  export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    iD_Number!: string;
    startWorking!: Date;
    birthDate!: Date;
    gender!: Gender;
    isActive!: boolean;
    employeeInPositions!: EmployeeInPosition[];
  }
  

