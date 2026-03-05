import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth-service.ts';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  register() {
    this.errMessage = '';
    this.successMessage = '';
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errMessage = 'Mật khẩu xác nhận không khớp!';
      return;
    }
    if (this.password.length < 6) {
      this.errMessage = 'Mật khẩu phải ít nhất 6 ký tự!';
      return;
    }
    this.isLoading = true;
    this._authService.register(this.username, this.password).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.successMessage = data.message + ' Chuyển về trang đăng nhập sau 2 giây...';
        setTimeout(() => this._router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.message || 'Đăng ký thất bại!';
      }
    });
  }

  goLogin() {
    this._router.navigate(['/login']);
  }
}