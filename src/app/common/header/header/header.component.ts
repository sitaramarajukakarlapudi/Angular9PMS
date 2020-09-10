import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  empUserName: string;
  profilePath: string;
  remainProjects: string;
  defalutProject: string;
  empDesignation: string;
  empDOJ: string;
  projects: SelectItem[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.empUserName = sessionStorage.getItem('userName');
    this.empDOJ = sessionStorage.getItem('doj');
    this.empDesignation = sessionStorage.getItem('designation');
    this.profilePath = 'Profile.png';
    this.getUserProjects();
  }

  getUserProjects() {
    this.remainProjects = '';
    const employeeId = sessionStorage.getItem('employeeId');
    this.userService.getUserProjects(employeeId).subscribe(
      (data) => {
        if (data !== undefined && data != null) {
          this.projects = data.map(function fun(proj) {
            return {
              label: proj.projectName,
              value: proj.projectId
            };
          });
          this.defalutProject = data.filter(P => P.isDefault === 1)[0].projectName;

          const remainProjectsList = data.filter(P => P.isDefault === 0);
          for (const projName of remainProjectsList) {
            if (this.remainProjects !== '') {
              this.remainProjects += ', ' + projName.projectName;
            } else {
              this.remainProjects = projName.projectName;
            }
          }
        }
      });
  }
}
