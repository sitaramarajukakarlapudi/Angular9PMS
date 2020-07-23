import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './base/master/master.component';
import { LoginComponent } from './base/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'master', component: MasterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
