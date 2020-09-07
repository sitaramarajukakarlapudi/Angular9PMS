import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issues } from 'src/app/_models/issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private serviceURL = environment.serviceUrl + 'issues/';
  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllIssues() {
    return this.http.get<Issues[]>(this.serviceURL + 'GetAllIssues', { headers: this.getHttpOptions() });
  }
}
