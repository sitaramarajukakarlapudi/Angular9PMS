import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeavesService } from 'src/app/_services/leaves/leaves.service';
import { Leave, LeaveMaster } from 'src/app/_models/leaves';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/_services/common/common.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.component.html',
  styleUrls: ['./alldata.component.css']
})
export class AlldataComponent implements OnInit {
  employeeId: string;
  leavesData: LeaveMaster[];
  virtualData: LeaveMaster[];
  profilePath: string;
  first = 0;
  rows = 5;
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

  loadCarsLazy(event: LazyLoadEvent) {
    // simulate remote connection with a timeout
    setTimeout(() => {
      // load data of required page
      const loadedCars = this.leavesData.slice(event.first, (event.first + event.rows));

      // populate page of virtual cars
      Array.prototype.splice.apply(this.virtualData, [...[event.first, event.rows], ...loadedCars]);

      // trigger change detection
      this.virtualData = [...this.virtualData];
    }, Math.random() * 1000 + 250);
  }

  btnBack_Click() {
    this.router.navigate(['/menu/applyleaves'], { skipLocationChange: false });
  }

  getLeavesHistory() {
    this.leavesSvc.getLeavesHistory(this.employeeId).subscribe(
      (data) => {
        this.leavesData = [];
        this.leavesData = data;
        this.virtualData = Array.from({ length: this.leavesData.length });
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

  // next() {
  //   this.first = this.first + this.rows;
  // }

  // prev() {
  //   this.first = this.first - this.rows;
  // }

  // reset() {
  //   this.first = 0;
  // }

  // isLastPage(): boolean {
  //   return this.leavesData ? this.first === (this.leavesData.length - this.rows) : true;
  // }

  // isFirstPage(): boolean {
  //   return this.leavesData ? this.first === 0 : true;
  // }
}
