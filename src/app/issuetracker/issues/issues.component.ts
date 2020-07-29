import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createissue() {
    this.router.navigate(['/menu/createissue'], { skipLocationChange: false });
  }
}
