import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  menu: any;
  clicked: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menu = [
      {
        headerMenu: 'Issue Tracker',
        childMenu: [{ name: 'Create an Issue', link: '/menu/createissue' },
        { name: 'Issues', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
      },
      {
        headerMenu: 'Header Menu 2',
        childMenu: [{ name: 'Child Menu 1', link: '' }, { name: 'Child Menu 2', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
      },
      {
        headerMenu: 'Header Menu 3',
        childMenu: [{ name: 'Child Menu 1', link: '' }, { name: 'Child Menu 2', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
      }
    ];
  }
  onMenuClick(event, link) {
    console.log(event);
    console.log(event.target.parentElement.parentElement.parentElement.children);
    for (const divMenu of event.target.parentElement.parentElement.parentElement.children) {
      // console.log(divMenu.children[1].children);
      for (const anchor of divMenu.children[1].children) {
        anchor.className = '';
      }
    }
    event.target.className = 'router-link-active';
    this.router.navigate([link], { skipLocationChange: false });
  }
}
