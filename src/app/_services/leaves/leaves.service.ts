import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { ReturnValue } from 'src/app/_models/common';
import { LeaveMasterDetails, LeaveMaster, LeaveHistory, Leave } from 'src/app/_models/leaves';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private serviceURL = environment.serviceUrl + 'leaves/';

  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getLeaveTypes() {
    return this.http.get<SelectItem[]>(this.serviceURL + 'GetLeaveTypes', { headers: this.getHttpOptions() });
  }

  getDurations() {
    return this.http.get<SelectItem[]>(this.serviceURL + 'GetDurations', { headers: this.getHttpOptions() });
  }

  getPeriods() {
    return this.http.get<SelectItem[]>(this.serviceURL + 'GetPeriods', { headers: this.getHttpOptions() });
  }

  insertLeaves(data: LeaveMasterDetails) {
    const body = JSON.stringify(data);
    return this.http.post<ReturnValue>(this.serviceURL + 'InsertLeaves',
      body, { headers: this.getHttpOptions() });
  }

  getLeavesHistory(employeeId: string) {
    const params = new HttpParams()
      .set('employeeId', employeeId.toString());
    return this.http.get<LeaveMaster[]>(this.serviceURL + 'GetLeaveHistory',
      { headers: this.getHttpOptions(), params });
  }

  getLeaves(employeeId: string) {
    const params = new HttpParams()
      .set('employeeId', employeeId.toString());
    return this.http.get<LeaveHistory[]>(this.serviceURL + 'GetLeaves',
      { headers: this.getHttpOptions(), params });
  }

  getApprovalLeaves(employeeId: string) {
    const params = new HttpParams()
      .set('employeeId', employeeId.toString());
    return this.http.get<LeaveHistory[]>(this.serviceURL + 'GetApprovalLeaves',
      { headers: this.getHttpOptions(), params });
  }

}
