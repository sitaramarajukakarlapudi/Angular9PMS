import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../_models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private serviceURL = environment.serviceUrl + 'login/';
  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  authenticateUser(credentials: Login) {
    const body = JSON.stringify(credentials);
    return this.http.post<Login>(this.serviceURL + 'AuthenticateUser', body, { headers: this.getHttpOptions() });
  }

}
