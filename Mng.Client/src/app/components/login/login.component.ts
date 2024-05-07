import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PanelModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
   timerInterval!:any;
   timer!:any
  errorMessage: string | null = null;

  constructor( private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(4)]),
    });
    alert(" datails to login: user name: admin. password: 123456")
  }

  async login(): Promise<void> {
    let userLogin = this.loginForm.value
    this.authenticationService.login(userLogin)
      .subscribe({
        next: () => {
          sessionStorage.setItem('isLogin', JSON.stringify(true));
          Swal.fire({
            title: "Access Granted",
            html: "You're in! Redirecting in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
               this.timer = Swal.getPopup()?.querySelector("b");
              this.timerInterval = setInterval(() => {
                this.timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(this.timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          });
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          Swal.fire({
            title: "Password in wrong",
            text: "Enter correct data!!",
            icon: "warning",
          })
        }
      });
  }
}
