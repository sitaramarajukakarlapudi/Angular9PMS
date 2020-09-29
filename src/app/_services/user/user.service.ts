import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserProjects } from 'src/app/_models/user';
import { Login } from 'src/app/_models/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceURL = environment.serviceUrl + 'users/';
  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getUserProjects(userId: string) {
    const params = new HttpParams()
      .set('userId', userId.toString());
    return this.http.get<UserProjects[]>(this.serviceURL + 'GetUserProjects', { headers: this.getHttpOptions(), params });
  }

  addUserImage(data) {
    const body = JSON.stringify(data);
    return this.http.post<string>(this.serviceURL + 'InsertLeaves',
      body, { headers: this.getHttpOptions() });
  }
}
