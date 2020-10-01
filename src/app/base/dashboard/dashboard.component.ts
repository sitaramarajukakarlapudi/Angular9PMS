import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { UserService } from 'src/app/_services/user/user.service';
import { IssuesService } from 'src/app/_services/issues/issues.service';
import { Issues } from 'src/app/_models/issues';
import { LeavesService } from 'src/app/_services/leaves/leaves.service';
import { LeaveHistory } from 'src/app/_models/leaves';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  empId = sessionStorage.getItem('employeeId');
  profilePath: string;
  projects: SelectItem[];
  selectedProject: string;
  empUserName: string;
  projIssues: Issues[];
  allIssuesCount: number;
  myIssuesCount: number;
  leavesCount: number;
  approvalLeavesCount: number;
  userIssues: Issues[];
  leavesData: LeaveHistory[];
  leavesApprovalData: LeaveHistory[];
  monthYear: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private issuesService: IssuesService,
    private leavesService: LeavesService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.empUserName = sessionStorage.getItem('userName');
    this.profilePath = 'Profile.png';
    this.leavesCount = 0;
    this.approvalLeavesCount = 0;
    this.leavesData = [];
    this.leavesApprovalData = [];
    this.monthYear = this.datePipe.transform(new Date(), 'MMM yyyy');
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
          this.selectedProject = data.filter(P => P.isDefault === 1)[0].projectId;
          this.getAllIssues(this.selectedProject);
        }
      });
  }
  getAllIssues(projId: string) {
    this.issuesService.getAllIssues().subscribe(
      (data) => {
        console.log(data);
        if (data !== undefined && data != null) {
          this.projIssues = data.filter(P => P.projectId.toString() === projId.toString());
          this.userIssues = data.filter(P => P.assignedTo === this.empUserName);
          this.allIssuesCount = this.projIssues.length;
          this.myIssuesCount = this.userIssues.length;
        }
        this.getLeavesCount();
      });
  }

  getLeavesCount() {
    this.leavesService.getLeaves(this.empId).subscribe(
      (data) => {
        if (data !== undefined && data != null) {
          this.leavesCount = data.length;
          this.leavesData = data;
        }
        this.getApprovalLeaves();
      }
    );
  }

  getApprovalLeaves() {
    this.leavesService.getApprovalLeaves(this.empId).subscribe(
      (data) => {
        if (data !== undefined && data != null) {
          this.approvalLeavesCount = data.length;
          this.leavesApprovalData = data;
        }
      }
    );
  }

  btnApply_Click() {
    this.router.navigate(['/menu/applyleaves'], { skipLocationChange: false });
  }

  btnLeaveHistory_Click() {
    this.router.navigate(['/menu/leavehistory'], { skipLocationChange: false });
  }
}
