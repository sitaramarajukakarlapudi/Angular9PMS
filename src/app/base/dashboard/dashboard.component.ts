import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profilePath: string;
  projects: SelectItem[];
  selectedProject: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.profilePath = 'Profile.png';
    this.projects = [
      { label: 'Select Project', value: null },
      { label: 'Elroi', value: { id: 1, name: 'Elroi', code: 'Elroi' } },
      { label: 'Time System', value: { id: 2, name: 'Time System', code: 'TS' } },
      { label: 'LifeSpeed', value: { id: 3, name: 'LifeSpeed', code: 'LS' } },
      { label: 'LS2', value: { id: 4, name: 'LS2', code: 'LS2' } },
      { label: 'PMS', value: { id: 5, name: 'PMS', code: 'PMS' } }
    ];
    this.selectedProject = this.projects.filter(m => m.label === 'Elroi')[0].value;
  }

  projectChange() {

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
