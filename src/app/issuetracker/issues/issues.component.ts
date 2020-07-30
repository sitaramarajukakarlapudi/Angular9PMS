import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from 'src/app/_models/issuetracker';
import { CreateissueComponent } from '../createissue/createissue.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private router: Router) { }
  issues: Issue[];
  cols: any;

  ngOnInit(): void {
    this.cols = [
      { field: 'project', header: 'Project' },
      { field: 'issueType', header: 'Issue Type' },
      { field: 'summary', header: 'Summary' },
      { field: 'description', header: 'Description' },
      { field: 'acceptenceCriteria', header: 'Acceptence Criteria' },
      { field: 'status', header: 'Issue Status' }
    ];
    this.issues = [
      {
        project: 'Project1', issueType: 'Normarl', summary: 'Issue in Project 1 Module 2',
        description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Open'
      },
      {
        project: 'Project2', issueType: 'Moderate', summary: 'Issue in Project 1 Module 2',
        description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Assinged'
      },
      {
        project: 'Project3', issueType: 'Critical', summary: 'Issue in Project 1 Module 2',
        description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Fixed'
      },
      {
        project: 'Project4', issueType: 'Show Stopper', summary: 'Issue in Project 1 Module 2',
        description: '1.)Login 2.)Open Project 1 3.)click submit', acceptenceCriteria: 'Hi here', status: 'Not an Issue'
      }
    ];
  }
  createissue() {
    this.router.navigate(['/menu/createissue'], { skipLocationChange: false });
  }
}
