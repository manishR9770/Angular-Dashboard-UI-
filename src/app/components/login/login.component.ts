import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  errorMsg = '';
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    const loginData = this.loginForm.value;

    this.http
      .post<any>('https://dummyjson.com/auth/login', loginData)
      .subscribe({
        next: (res) => {
          const { accessToken, refreshToken, ...user } = res;

          this.authService.login(accessToken, user);
          this.router.navigate(['/dashboard']);
          console.log('Login Response:', res);
        },
        error: (err) => {
          this.errorMsg = 'Invalid credentials or server error';
          this.loading = false;
        },
      });
  }
}
