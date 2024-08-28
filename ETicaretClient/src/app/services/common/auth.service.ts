import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  constructor(private jwtHelper: JwtHelperService) {
    this.identityCheck(); // Başlangıçta durumu kontrol et
  }

  identityCheck() {
    const token: string | null = localStorage.getItem("accessToken");

    let expired: boolean;
    try {
      expired = token ? this.jwtHelper.isTokenExpired(token) : true;
    } catch {
      expired = true;
    }

    this._isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
