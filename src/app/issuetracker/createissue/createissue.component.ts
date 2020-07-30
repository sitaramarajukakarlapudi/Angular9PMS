import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Issue } from 'src/app/_models/issuetracker';
import { IssuesComponent } from '../issues/issues.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  projects: SelectItem[];
  selectedProject: string;
  issueform: FormGroup;
  issue: Issue;
  issueList: Issue[] = [];
  issueTypes: SelectItem[];
  selectedIssue: string;
  description: string;
  acceptenceCriteria: string;

  ngOnInit(): void {
    this.issueform = this.fb.group({
      frmproject: new FormControl('', Validators.required),
      frmissueType: new FormControl('', Validators.required),
      frmsummary: new FormControl('', Validators.required),
      // frmdescription: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      frmdescription: new FormControl('', Validators.required),
      frmacceptence: new FormControl('')
    });

    this.projects = [
      { label: 'Select Project', value: null },
      { label: 'Project 1', value: { id: 1, name: 'Project 1', code: 'P1' } },
      { label: 'Project 2', value: { id: 2, name: 'Project 2', code: 'P2' } },
      { label: 'Project 3', value: { id: 3, name: 'Project 3', code: 'P3' } },
      { label: 'Project 4', value: { id: 4, name: 'Project 4', code: 'P4' } },
      { label: 'Project 5', value: { id: 5, name: 'Project 5', code: 'P5' } }
    ];
    this.issueTypes = [
      { label: 'Select Issue Type', value: null },
      { label: 'Normal', value: { id: 1, name: 'Normal', code: 'N' } },
      { label: 'Moderate', value: { id: 2, name: 'Moderate', code: 'M' } },
      { label: 'Critical', value: { id: 3, name: 'Critical', code: 'C' } },
      { label: 'Show Stopper', value: { id: 4, name: 'Show Stopper', code: 'ST' } },
    ];
  }
  onSubmit(value: any) {
    console.log(value.frmproject.name);
    this.issue = new Issue();
    this.issue.project = value.frmproject.name;
    this.issue.issueType = value.frmissueType.name;
    this.issue.summary = value.frmsummary;
    this.issue.description = value.frmdescription;
    this.issue.acceptenceCriteria = value.frmacceptence;
    this.issueList.push(this.issue);
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Issue Created' });
    this.router.navigate(['/menu/issues'], { skipLocationChange: false });
  }

}
