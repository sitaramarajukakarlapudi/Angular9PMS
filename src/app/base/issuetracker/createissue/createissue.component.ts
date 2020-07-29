import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {

  constructor() { }
  projects: SelectItem[];
  selectedProject: string;

  issueTypes: SelectItem[];
  selectedIssue: string;
  description: string;
  acceptenceCriteria: string;
  ngOnInit(): void {
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
      { label: 'Normal', value: { id: 1, name: 'Project 1', code: 'P1' } },
      { label: 'Moderate', value: { id: 2, name: 'Project 2', code: 'P2' } },
      { label: 'Critical', value: { id: 3, name: 'Project 3', code: 'P3' } },
      { label: 'Show Stopper', value: { id: 4, name: 'Project 4', code: 'P4' } },
    ];
  }

}
