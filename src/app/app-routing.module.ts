import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './base/master/master.component';
import { LoginComponent } from './base/login/login.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { CreateissueComponent } from './issuetracker/createissue/createissue.component';
import { IssuesComponent } from './issuetracker/issues/issues.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { CreateprojectComponent } from './projects/createproject/createproject.component';
import { AssignissuesComponent } from './issuetracker/assignissues/assignissues.component';
import { LeaveapplyComponent } from './leaves/leaveapply/leaveapply.component';
import { LeavehistoryComponent } from './leaves/leavehistory/leavehistory.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'menu',
    component: MasterComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createissue', component: CreateissueComponent },
      { path: 'applyleaves', component: LeaveapplyComponent },
      { path: 'leavehistory', component: LeavehistoryComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'createproject', component: CreateprojectComponent },
      { path: 'asssignissues', component: AssignissuesComponent },
    ], runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: false,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
