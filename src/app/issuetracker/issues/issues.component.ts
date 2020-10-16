import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Issues, XcelIssues } from 'src/app/_models/issues';
import { IssuesService } from 'src/app/_services/issues/issues.service';
import { CreateissueComponent } from '../createissue/createissue.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as xlsx from 'xlsx';
import * as fs from 'file-saver';
import { Table } from 'primeng/table';
import { concatAll } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  exportColumns: any;
  xcelissues: any[];
  @ViewChild('dt') dt: Table;
  constructor(private router: Router, private issuesService: IssuesService) { }
  issues: Issues[];
  cols: any;
  empUserName: string;
  userIssues: Issues[];
  selectedIssue: Issues;
  first = 0;
  rows = 5;
  items: MenuItem[];
  showColumnFilters: boolean;

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
    this.items = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV() },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf() },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel() },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
    this.showColumnFilters = false;
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
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.getAllIssues();
  }
  showFilters(): void {
    this.showColumnFilters = true;
    this.items = [
      { label: 'Hide Column Filters', icon: 'pi pi-eye-slash', command: () => this.hideFilters() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV() },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf() },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel() },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
  }
  hideFilters(): void {
    this.showColumnFilters = false;
    this.items = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV() },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf() },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel() },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
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
  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    doc['autoTable'](this.exportColumns, this.userIssues);
    doc.save('products.pdf');
  }

  exportExcel() {
    // const ws: xlsx.WorkSheet =
    //   xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    // const wb: xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    // xlsx.writeFile(wb, 'epltable.xlsx');
    this.xcelissues = this.userIssues;
    console.log(this.xcelissues);
    this.xcelissues = this.userIssues.map(function fun(ui) {
      return {
        projectName: ui.projectName,
        summary: ui.summary,
        description: ui.description,
        acceptanceCriteria: ui.acceptanceCriteria,
        assignedTo: ui.assignedTo,
        assignedOn: ui.assignedOn,
        issueType: ui.issueType,
        status: ui.status,
      };
    });
    const worksheet = xlsx.utils.json_to_sheet(this.xcelissues);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'primengTable');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // const newLocal = 'file-saver';
    // import(newLocal).then(FileSaver => {
    //   const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //   const EXCEL_EXTENSION = '.xlsx';
    //   const data: Blob = new Blob([buffer], {
    //     type: EXCEL_TYPE
    //   });
    //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    // });
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fs.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  exportCSV() {
    this.dt.exportCSV();
  }
}
