import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string;
  ngOnInit(): void {
  }

  constructor(
    private router: Router,
  ) {
    this.title = 'Angular9PMS';

    router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationStart) {
        // this.dataSvc.changeSpinner(true);
      }

      if (event instanceof NavigationEnd) {
        // this.dataSvc.changeSpinner(false);
      }

      if (event instanceof NavigationError) {
        // this.dataSvc.changeSpinner(false);
      }
      if (event instanceof NavigationCancel) {
        // this.dataSvc.changeSpinner(false);
      }
    });
  }
}
