import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './base/master/master.component';
import { LoginComponent } from './base/login/login.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { CreateissueComponent } from './issuetracker/createissue/createissue.component';
import { LeavesComponent } from './leaves/leaves.component';
import { IssuesComponent } from './issuetracker/issues/issues.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { CreateprojectComponent } from './projects/createproject/createproject.component';

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
      { path: 'leaves', component: LeavesComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'createproject', component: CreateprojectComponent },
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
