import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(token: string, user: any) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }

  getUser() {
    if (this.isBrowser) {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined') {
        try {
          return JSON.parse(userData);
        } catch (e) {
          console.error('Failed to parse user from localStorage:', e);
          return null;
        }
      }
    }
    return null;
  }
}
