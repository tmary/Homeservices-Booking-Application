import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(public jwtHelper: JwtHelperService) { }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  removeToken(): void {
    localStorage.removeItem('jwt');
  }

  isTokenExpired(token?: string): boolean {
    return this.jwtHelper.isTokenExpired(token || this.getToken());
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if(token) {
      const decoded: any = jwtDecode(token);
      return decoded.isAdmin === true;
    }
    return false;
  }
}
