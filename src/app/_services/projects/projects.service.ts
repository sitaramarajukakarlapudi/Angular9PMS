import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issues } from 'src/app/_models/issues';
import { Projects } from 'src/app/_models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private serviceURL = environment.serviceUrl + 'projects/';
  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllProjects() {
    return this.http.get<Projects[]>(this.serviceURL + 'GetAllProjects', { headers: this.getHttpOptions() });
  }
}
