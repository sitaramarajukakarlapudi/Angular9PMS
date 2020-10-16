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
import { MenuItem, SortEvent } from 'primeng/api';
import { TabPanel } from 'primeng';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  exportColumns: any;
  xcelissues: any[];
  @ViewChild('dt') dt: Table;
  @ViewChild('dt2') dt2: Table;
  constructor(private router: Router, private issuesService: IssuesService) { }
  issues: Issues[];
  cols: any;
  cols2: any;
  empUserName: string;
  userIssues: Issues[];
  userIssues2: Issues[];
  selectedIssue: Issues;
  selectedIssue2: Issues;
  first = 0;
  first2 = 0;
  rows = 5;
  items: MenuItem[];
  items2: MenuItem[];
  showColumnFilters: boolean;
  showColumnFilters2: boolean;

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
    this.cols2 = [
      { field: 'projectName', header: 'Project' },
      { field: 'description', header: 'Description' },
      { field: 'acceptenceCriteria', header: 'Acceptence Criteria' },
      { field: 'assignedTo', header: 'Assinged To' },
      { field: 'issueType', header: 'Issue Type' },
      { field: 'status', header: 'Issue Status' }
    ];
    this.items = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt) },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
    this.items2 = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters2() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt2) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt2) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt2) },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
    this.showColumnFilters = false;
    this.showColumnFilters2 = false;
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
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt2) },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
  }
  hideFilters(): void {
    this.showColumnFilters = false;
    this.items = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt2) },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
  }
  showFilters2(): void {
    this.showColumnFilters2 = true;
    this.items2 = [
      { label: 'Hide Column Filters', icon: 'pi pi-eye-slash', command: () => this.hideFilters2() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt2) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt2) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt2) },
      { label: 'Print this page', icon: 'pi pi-print' },
      { label: 'Email this page', icon: 'pi pi-envelope' },
    ];
  }
  hideFilters2(): void {
    this.showColumnFilters2 = false;
    this.items2 = [
      { label: 'Show Column Filters', icon: 'pi pi-eye', command: () => this.showFilters2() },
      { label: 'Download CSV', icon: 'pi pi-file', command: () => this.exportCSV(this.dt2) },
      { label: 'Download PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf(this.dt2) },
      { label: 'Download excel', icon: 'pi pi-file-excel', command: () => this.exportExcel(this.dt2) },
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
    this.issuesService.getAllIssues().subscribe(
      (data) => {
        console.log(data);
        if (data !== undefined && data != null) {
          // this.userIssues = data.filter(P => P.assignedTo === this.empUserName);
          this.userIssues2 = data;
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
  exportPdf(dt: Table) {
    const doc = new jsPDF('p', 'pt');
    if (dt.hasFilter()) {
      doc['autoTable'](this.exportColumns, this.dt.filteredValue);
    } else {
      doc['autoTable'](this.exportColumns, this.dt.value);
    }
    doc.save('products.pdf');
  }

  exportExcel(dt: Table) {
    // const ws: xlsx.WorkSheet =
    //   xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    // const wb: xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    // xlsx.writeFile(wb, 'epltable.xlsx');
    if (dt.hasFilter()) {
      this.xcelissues = dt.filteredValue.map(function fun(ui) {
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
    } else {
      this.xcelissues = dt.value.map(function fun(ui) {
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
    }
    console.log(this.xcelissues);
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
  exportCSV(dt: Table) {
    dt.exportCSV();
  }
  clearFilter(dt: Table) {
    dt.reset();
  }
}
