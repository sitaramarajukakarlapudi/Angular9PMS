import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { UserProjects } from 'src/app/_models/user';
import { Login } from 'src/app/_models/login';
import { UserService } from 'src/app/_services/user/user.service';
import { IssuesService } from 'src/app/_services/issues/issues.service';
import { Issues } from 'src/app/_models/issues';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profilePath: string;
  projects: SelectItem[];
  selectedProject: string;
  empUserName: string;
  empDOJ: string;
  empDesignation: string;
  defalutProject: string;
  remainProjects: string;
  allProjects: UserProjects[];
  projIssues: Issues[];
  allIssuesCount: number;
  myIssuesCount: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private issuesService: IssuesService,
  ) { }

  ngOnInit() {
    this.empUserName = sessionStorage.getItem('userName');
    this.empDOJ = sessionStorage.getItem('doj');
    this.empDesignation = sessionStorage.getItem('designation');
    this.profilePath = 'Profile.png';
    this.projects = [
      { label: 'Select Project', value: null },
      { label: 'Elroi', value: { id: 1, name: 'Elroi', code: 'Elroi' } },
      { label: 'Time System', value: { id: 2, name: 'Time System', code: 'TS' } },
      { label: 'LifeSpeed', value: { id: 3, name: 'LifeSpeed', code: 'LS' } },
      { label: 'LS2', value: { id: 4, name: 'LS2', code: 'LS2' } },
      { label: 'PMS', value: { id: 5, name: 'PMS', code: 'PMS' } }
    ];
    this.selectedProject = this.projects.filter(m => m.label === 'Elroi')[0].value;
    this.getUserProjects();
  }

  projectChange() {
    this.getAllIssues(this.selectedProject);
  }

  navigateToPage(srcFrom: string) {
    if (srcFrom && srcFrom !== '') {
      if (srcFrom === 'leaves') {
        this.router.navigate(['/menu/applyleaves'], { skipLocationChange: false });
      }
    }
  }

  openissues() {
    this.router.navigate(['/menu/issues'], { skipLocationChange: false });
  }
  getUserProjects() {
    this.remainProjects = '';
    const employeeId = sessionStorage.getItem('employeeId');
    console.log(employeeId);
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
          this.selectedProject = data.filter(P => P.isDefault === 1)[0].projectId;

          const remainProjectsList = data.filter(P => P.isDefault === 0);
          for (const projName of remainProjectsList) {
            if (this.remainProjects !== '') {
              this.remainProjects += ', ' + projName.projectName;
            } else {
              this.remainProjects = projName.projectName;
            }

          }
          this.getAllIssues(this.selectedProject);
        }
      });
  }
  getAllIssues(projId: string) {
    this.issuesService.getAllIssues().subscribe(
      (data) => {
        if (data !== undefined && data != null) {
          this.projIssues = data.filter(P => P.projectId.toString() === projId.toString());
          this.allIssuesCount = this.projIssues.length;
          this.myIssuesCount = this.projIssues.length;
        }
      });
  }
}
