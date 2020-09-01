import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/_services/shared/-shared.service';

@Component({
  selector: 'app-assignissues',
  templateUrl: './assignissues.component.html',
  styleUrls: ['./assignissues.component.css']
})
export class AssignissuesComponent implements OnInit {

  constructor(private sharedSer: SharedService) { }
  toDOlist: any[];
  inProlist: any[];
  donelist: any[];
  display = false;
  currentSidebarStatus = false;
  ngOnInit(): void {
    this.sharedSer.currentLayoutClass.subscribe(status => this.currentSidebarStatus = status);
    this.toDOlist = [{ issueName: 'Issue 1' }, { issueName: 'Issue 2' }, { issueName: 'Issue 6' }, { issueName: 'Issue 7' }];
    this.inProlist = [{ issueName: 'Issue 2' }, { issueName: 'Issue 3' }, { issueName: 'Issue 5' }];
    this.donelist = [{ issueName: 'Issue 4' }];
  }
  moveIssue(status: string, movedIssue: string) {
    if (status === 'Inprogress') {
      this.toDOlist = this.toDOlist.filter(item => item.issueName !== movedIssue);
      this.inProlist.push({ issueName: movedIssue });
    } else if (status === 'Todo') {
      console.log(this.inProlist);
      this.inProlist = this.inProlist.filter(item => item.issueName !== movedIssue);
      this.toDOlist.push({ issueName: movedIssue });
    }
    else if (status === 'Done') {
      this.inProlist = this.inProlist.filter(item => item.issueName !== movedIssue);
      this.donelist.push({ issueName: movedIssue });
    }
  }
  cardClick() {
    this.display = true;
    this.sharedSer.changeLayoutClass(false);
    console.log('ddd');
  }
  setSidebarNormal() { 
    this.sharedSer.changeLayoutClass(true);
  }
}
