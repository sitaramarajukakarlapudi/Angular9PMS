import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeavesService } from 'src/app/_services/leaves/leaves.service';
import { LeaveMaster } from 'src/app/_models/leaves';

@Component({
  selector: 'app-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.css']
})
export class LeavehistoryComponent implements OnInit {
  employeeId: string;
  leavesData: LeaveMaster[];

  constructor(
    private router: Router,
    private leavesSvc: LeavesService
  ) { }

  ngOnInit() {
    this.employeeId = sessionStorage.getItem('employeeId');
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
        console.log(this.leavesData);
      }
    );
  }

}
