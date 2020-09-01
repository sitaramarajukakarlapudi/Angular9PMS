import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './base/master/master.component';
import { LoginComponent } from './base/login/login.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { CreateissueComponent } from './issuetracker/createissue/createissue.component';


import { IssuesComponent } from './issuetracker/issues/issues.component';
import { MenubarModule } from 'primeng/menubar';
import { EditorModule } from 'primeng/editor';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { ProjectsComponent } from './projects/projects/projects.component';
import { CreateprojectComponent } from './projects/createproject/createproject.component';
import { LeavehistoryComponent } from './leaves/leavehistory/leavehistory.component';
import { LeaveapplyComponent } from './leaves/leaveapply/leaveapply.component';
@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    LoginComponent,
    DashboardComponent,
    CreateissueComponent,
    IssuesComponent,
    ProjectsComponent,
    CreateprojectComponent,
    LeavehistoryComponent,
    LeaveapplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    PanelModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    AutoCompleteModule,
    ToolbarModule,
    CardModule,
    CalendarModule,
    MenubarModule,
    PanelModule,
    EditorModule,
    TableModule,
    SplitButtonModule,
    OverlayPanelModule,
    FileUploadModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
