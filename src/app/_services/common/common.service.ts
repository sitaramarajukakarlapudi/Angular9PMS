import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

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
}
