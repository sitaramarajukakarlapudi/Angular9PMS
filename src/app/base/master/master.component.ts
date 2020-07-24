import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  menu: any;
  clicked: string;
  constructor() { }

  ngOnInit(): void {
    this.menu = [
      {
        headerMenu: 'Header Menu 1',
        childMenu: ['Child Menu 1', 'Child Menu 2', 'Child Menu 3', 'Child Menu 4']
      },
      {
        headerMenu: 'Header Menu 2',
        childMenu: ['Child Menu 1', 'Child Menu 2', 'Child Menu 3', 'Child Menu 4'],
      },
      {
        headerMenu: 'Header Menu 3',
        childMenu: ['Child Menu 1', 'Child Menu 2', 'Child Menu 3', 'Child Menu 4'],
      }
    ];
  }
  onMenuClick(event) {
    console.log(event);
    console.log(event.target.parentElement.parentElement.parentElement.children);
    for (const divMenu of event.target.parentElement.parentElement.parentElement.children) {
      // console.log(divMenu.children[1].children);
      for (const anchor of divMenu.children[1].children) {
        anchor.className = '';
      }
    }

    this.clicked = '';
    event.target.className = 'router-link-active';
  }
}
