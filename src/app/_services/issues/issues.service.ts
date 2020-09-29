import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issues, IssueTypes } from 'src/app/_models/issues';
import { ReturnValue } from 'src/app/_models/common';

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
  getIssueTypes(mode: string) {
    const params = new HttpParams()
      .set('strMode', mode.toString());
    return this.http.get<IssueTypes[]>(this.serviceURL + 'GetIssueTypes', { headers: this.getHttpOptions(), params });
  }
  createIssue(data: Issues) {
    const body = JSON.stringify(data);
    return this.http.post<ReturnValue>(this.serviceURL + 'InsertIssues',
      body, { headers: this.getHttpOptions() });
  }
}
