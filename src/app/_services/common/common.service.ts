import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { InvDate } from 'src/app/_models/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private serviceURL = environment.serviceUrl + 'common/';

  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getLocations() {
    return this.http.get<SelectItem[]>(this.serviceURL + 'GetLocations', { headers: this.getHttpOptions() });
  }

  getManagers(employeeId: string) {
    const params = new HttpParams()
      .set('employeeId', employeeId.toString());
    return this.http.get<SelectItem[]>(this.serviceURL + 'GetManagers',
      { headers: this.getHttpOptions(), params });
  }

  GetHolidays(branch: string, startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('branch', branch)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<InvDate[]>(this.serviceURL + 'GetHolidays',
      { headers: this.getHttpOptions(), params });
  }

  GetHolidaysList(branch: string) {
    const params = new HttpParams()
      .set('branch', branch);
    return this.http.get<InvDate[]>(this.serviceURL + 'GetHolidaysList',
      { headers: this.getHttpOptions(), params });
  }
}
