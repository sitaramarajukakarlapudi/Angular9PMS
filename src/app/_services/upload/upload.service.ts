import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private serviceURL = environment.serviceUrl + 'Upload/';
  constructor(private httpClient: HttpClient) { }
  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  upload(data) {
    const uploadHeaders = new HttpHeaders();
    uploadHeaders.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<any>(this.serviceURL + 'UploadFile', data, { headers: uploadHeaders });
  }
  // download() {
  //   const uploadHeaders = new HttpHeaders();
  //   uploadHeaders.append('Content-Type', 'multipart/form-data');

  //   return this.httpClient.get<any>(this.serviceURL + 'Download');
  // }
  download(): any {
    return this.httpClient.get(this.serviceURL + 'Download', { responseType: 'blob' });
  }
}
