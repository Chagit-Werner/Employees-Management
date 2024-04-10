import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth-guard.guard';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeTableComponent } from './components/employees-table/employees-table.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'employees', component: EmployeeTableComponent, canActivate:[authGuard] },
    { path: '**', component: NotfoundComponent }
];
