import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './myservices/auth-service.ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'my-app';

  constructor(private _auth: AuthService, private _router: Router) {}

  isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

  getUsername(): string {
    return this._auth.getUsername() || '';
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}