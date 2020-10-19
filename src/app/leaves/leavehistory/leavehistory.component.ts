import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeavesService } from 'src/app/_services/leaves/leaves.service';
import { LeaveMaster } from 'src/app/_models/leaves';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/_services/common/common.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.css']
})
export class LeavehistoryComponent implements OnInit {
  employeeId: string;
  leavesData: LeaveMaster[];
  profilePath: string;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  leaveTypes: SelectItem[];
  leaveStatus: SelectItem[];

  constructor(
    private router: Router,
    private leavesSvc: LeavesService,
    private commonSvc: CommonService
  ) { }

  ngOnInit() {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.profilePath = 'Profile.png';
    this.getLeavesHistory();
  }

  btnBack_Click() {
    this.router.navigate(['/menu/applyleaves'], { skipLocationChange: false });
  }

  getLeavesHistory() {
    this.leavesSvc.getLeavesHistory(this.employeeId).subscribe(
      (data) => {
        this.leavesData = [];
        this.leavesData = data;
        this.getLeaveTypes();
      }
    );
  }

  getLeaveTypes() {
    this.commonSvc.getLeaveTypes().subscribe(
      (data) => {
        this.leaveTypes = [];
        this.leaveTypes = data;
        this.getLeaveStatus();
      }
    );
  }

  getLeaveStatus() {
    this.commonSvc.getLeaveStatus().subscribe(
      (data) => {
        this.leaveStatus = [];
        this.leaveStatus = data;
      }
    );
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
    return this.leavesData ? this.first === (this.leavesData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.leavesData ? this.first === 0 : true;
  }

}
