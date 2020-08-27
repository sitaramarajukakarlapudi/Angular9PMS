import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  menu: any;
  clicked: string;
  constructor(private router: Router) { }
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => this.itemClick('dashboard'),
        // items: [{
        //   label: 'New',
        //   icon: 'pi pi-fw pi-plus',
        //   items: [
        //     { label: 'Project' },
        //     { label: 'Other' },
        //   ]
        // },
        // { label: 'Open' },
        // { label: 'Quit' }
        // ]
      },
      // { separator: true },
      {
        label: 'Projects',
        command: () => this.itemClick('projects'),
        // icon: 'pi pi-fw pi-pencil',
        // items: [
        //   { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        //   { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        // ]
      },
      // { separator: true },
      {
        label: 'Issues',
        command: () => this.itemClick('issues'),
        // icon: 'pi pi-fw pi-pencil',
        // items: [
        //   { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        //   { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        // ]
      }
    ];
    // this.menu = [
    //   {
    //     headerMenu: 'Issue Tracker',
    //     childMenu: [{ name: 'Create an Issue', link: '/menu/createissue' },
    //     { name: 'Issues', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
    //   },
    //   {
    //     headerMenu: 'Header Menu 2',
    //     childMenu: [{ name: 'Child Menu 1', link: '' }, { name: 'Child Menu 2', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
    //   },
    //   {
    //     headerMenu: 'Header Menu 3',
    //     childMenu: [{ name: 'Child Menu 1', link: '' }, { name: 'Child Menu 2', link: '' }, { name: 'Child Menu 3', link: '' }, { name: 'Child Menu 4', link: '' }],
    //   }
    // ];
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
  itemClick(itemName) {
    if (itemName === 'dashboard') {
      this.router.navigate(['/menu/dashboard'], { skipLocationChange: false });
    } else if (itemName === 'issues') {
      this.router.navigate(['/menu/issues'], { skipLocationChange: false });
    } else if (itemName === 'projects') {
      this.router.navigate(['/menu/projects'], { skipLocationChange: false });
    }
  }
  logout() {
    this.router.navigate(['/login'], { skipLocationChange: false });
  }
  save() { }
}
