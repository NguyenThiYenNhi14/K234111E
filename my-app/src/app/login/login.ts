import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth-service.ts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/ex53']);
    }
  }

  login() {
    this.errMessage = '';
    this.successMessage = '';
    if (!this.username || !this.password) {
      this.errMessage = 'Vui lòng nhập đầy đủ username và password!';
      return;
    }
    this.isLoading = true;
    this._authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.successMessage = data.message;
        this._authService.saveToken(data.token, data.username);
        this._router.navigate(['/ex53']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.message || 'Đăng nhập thất bại!';
      }
    });
  }

  goRegister() {
    this._router.navigate(['/register']);
  }
}