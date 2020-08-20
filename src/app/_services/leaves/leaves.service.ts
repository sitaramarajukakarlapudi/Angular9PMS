import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

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


}
