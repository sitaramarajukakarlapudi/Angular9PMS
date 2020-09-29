import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Issues } from 'src/app/_models/issues';
import { IssuesComponent } from '../issues/issues.component';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/_services/upload/upload.service';
import { ProjectsService } from 'src/app/_services/projects/projects.service';
import { IssuesService } from 'src/app/_services/issues/issues.service';
import { IssueTypes } from 'src/app/_models/issues';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uploadService: UploadService,
    private issueService: IssuesService,
    private projectsService: ProjectsService,
    private messageService: MessageService,
  ) {

  }
  projects: SelectItem[];
  selectedProject: string;
  issueform: FormGroup;
  issue: Issues;
  issueList: Issues[] = [];
  issueTypes: SelectItem[];
  selectedIssue: string;
  description: string;
  acceptenceCriteria: string;
  form: FormGroup;
  error: string;
  userId = '';
  userName = '';
  uploadResponse = { status: '', message: '', filePath: '' };
  selectFiles: File[] = [];
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('employeeId');
    this.userName = sessionStorage.getItem('userName');

    this.issueform = this.fb.group({
      frmproject: new FormControl('', Validators.required),
      frmissueType: new FormControl('', Validators.required),
      frmsummary: new FormControl('', Validators.required),
      // frmdescription: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      frmdescription: new FormControl('', Validators.required),
      frmacceptence: new FormControl(''),
    });

    // this.projects = [
    //   { label: 'Select Project', value: null },
    //   { label: 'Project 1', value: { id: 1, name: 'Project 1', code: 'P1' } },
    //   { label: 'Project 2', value: { id: 2, name: 'Project 2', code: 'P2' } },
    //   { label: 'Project 3', value: { id: 3, name: 'Project 3', code: 'P3' } },
    //   { label: 'Project 4', value: { id: 4, name: 'Project 4', code: 'P4' } },
    //   { label: 'Project 5', value: { id: 5, name: 'Project 5', code: 'P5' } }
    // ];
    this.getProjects();
    this.getIssueTypes();
  }
  onSubmit(value: any) {
    console.log(value);
    this.issue = new Issues();
    this.issue.id = '-1';
    this.issue.projectId = value.frmproject;
    this.issue.issueTypeId = value.frmissueType;
    this.issue.summary = value.frmsummary;
    this.issue.description = value.frmdescription;
    this.issue.acceptanceCriteria = value.frmacceptence;
    this.issue.reportedBy = this.userId;
    this.issueList.push(this.issue);
    this.issueService.createIssue(this.issue).subscribe(
      (data) => {
        console.log(data);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: data.statusMessage });

        const uploadData = new FormData();
        uploadData.append('issueId', data.detailIds);
        uploadData.append('userId', this.userId);
        uploadData.append('userName', this.userName);
        for (let i = 0; i < this.selectFiles.length; i++) {
          uploadData.append('myangFile' + i, this.selectFiles[i], this.selectFiles[i].name);
        }
        console.log(this.selectFiles);
        this.uploadService.upload(uploadData).subscribe(
          (res) => { console.log(res); },
          (err) => { console.log(err); }
        );
      });
    this.router.navigate(['/menu/issues'], { skipLocationChange: false });
  }
  selectFile(file: any) {
    this.selectFiles = [];
    for (const f of file) {
      this.selectFiles.push(f);
    }
  }
  onRemoveFile(event) {
    // console.log('after remove .. ' + event.file.name);
    const index: number = this.selectFiles.indexOf(event.file);
    if (index !== -1) {
      this.selectFiles.splice(index, 1);
    }
  }
  cancel() {
    // this.uploadService.download().subscribe();
  }
  getProjects() {
    this.projects = [];
    this.projectsService.getAllProjects().subscribe(
      (data) => {
        if (data != null && data !== undefined && data.length > 0) {
          this.projects = data.map(function fun(proj) {
            return {
              label: proj.projectName,
              value: proj.id
            };
          });
        }
      });
  }
  getIssueTypes() {
    this.issueTypes = [];
    this.issueService.getIssueTypes('IssueType').subscribe(
      (data) => {
        console.log(data);
        if (data !== null && data !== undefined && data.length > 0) {
          this.issueTypes = data.map(function fun(issueType) {
            return {
              label: issueType.label,
              value: issueType.id
            };
          });
        }
      });
  }
  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('avatar').setValue(file);
  //   }
  // }
}
