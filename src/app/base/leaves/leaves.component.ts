import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  rangeDates: Date[];
  isValidDateRange: boolean;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.isValidDateRange = false;
  }

  btnBack_Click() {
    this.router.navigate(['/menu/dashboard'], { skipLocationChange: false });
  }

  calClose() {
    if (this.rangeDates) {
      this.isValidDateRange = true;
    } else {
      this.isValidDateRange = false;
    }
  }

}
