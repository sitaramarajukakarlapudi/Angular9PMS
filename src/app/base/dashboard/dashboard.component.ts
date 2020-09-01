import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profilePath: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.profilePath = 'Profile.png';
  }

  navigateToPage(srcFrom: string) {
    if (srcFrom && srcFrom !== '') {
      if (srcFrom === 'leaves') {
        this.router.navigate(['/menu/applyleaves'], { skipLocationChange: false });
      }
    }
  }

  openissues() {
    this.router.navigate(['/menu/issues'], { skipLocationChange: false });
  }
}
