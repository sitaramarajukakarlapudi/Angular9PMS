import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Issues } from 'src/app/_models/issues';
import { IssuesService } from 'src/app/_services/issues/issues.service';
import { CreateissueComponent } from '../createissue/createissue.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private router: Router, private issuesService: IssuesService,) { }
  issues: Issues[];
  cols: any;
  empUserName: string;
  userIssues: Issues[];
  selectedIssue: Issues;
  first = 0;
  rows = 5;

  ngOnInit(): void {
    this.empUserName = sessionStorage.getItem('userName');
    this.cols = [
      { field: 'projectName', header: 'Project' },
      { field: 'summary', header: 'Summary' },
      { field: 'description', header: 'Description' },
      { field: 'acceptenceCriteria', header: 'Acceptence Criteria' },
      { field: 'assignedTo', header: 'Assinged To' },
      { field: 'assignedOn', header: 'Assinged On' },
      { field: 'issueType', header: 'Issue Type' },
      { field: 'status', header: 'Issue Status' }
    ];
    // this.issues = [
    //   {
    //     project: 'Project1', issueType: 'Normarl', summary: 'Issue in Project 1 Module 2',
    //     description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Open'
    //   },
    //   {
    //     project: 'Project2', issueType: 'Moderate', summary: 'Issue in Project 1 Module 2',
    //     description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Assinged'
    //   },
    //   {
    //     project: 'Project3', issueType: 'Critical', summary: 'Issue in Project 1 Module 2',
    //     description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Fixed'
    //   },
    //   {
    //     project: 'Project4', issueType: 'Show Stopper', summary: 'Issue in Project 1 Module 2',
    //     description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Not an Issue'
    //   }
    // ];
    this.getAllIssues();
  }
  createissue() {
    this.router.navigate(['/menu/createissue'], { skipLocationChange: false });
  }
  getAllIssues() {
    this.issuesService.getAllIssues().subscribe(
      (data) => {
        console.log(data);
        if (data !== undefined && data != null) {
          // this.userIssues = data.filter(P => P.assignedTo === this.empUserName);
          this.userIssues = data;
        }
      });
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.userIssues ? this.first === (this.userIssues.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.userIssues ? this.first === 0 : true;
  }
}
