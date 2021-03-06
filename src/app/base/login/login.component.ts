import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Login } from 'src/app/_models/login';
import { LoginService } from 'src/app/_services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private loginSvc: LoginService,
  ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      firstname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  get currentFormControls() {
    return this.userform.controls;
  }

  hasFormErrors() {
    return !this.userform.valid;
  }

  hasFormErrorsForgot() {
    return !this.currentFormControls.ctrlUsername.valid;
  }

  resetForm() {
    if (this.userform) {
      this.userform.markAsPristine();
      this.userform.markAsUntouched();
      this.userform.updateValueAndValidity();
      this.userform.reset();
    }
  }

  onSubmit(value: string) {
    if (this.userform.invalid) {
      return;
    } else {
      this.validateCredentials();
    }
  }

  validateCredentials() {
    const req: Login = {
      login: this.currentFormControls.firstname.value.toString(),
      password: this.currentFormControls.password.value.toString()
    };
    this.resetForm();
    this.loginSvc.authenticateUser(req).subscribe(
      (data) => {
        console.log(data);
        if (data !== undefined && data != null) {
          if (data.errorMsg != null && data.errorMsg !== '') {
            this.messageService.add({
              key: 'alert',
              sticky: true,
              severity: 'error',
              summary: 'Login Failed!',
              detail: 'Invalid Credentials'
            });
          } else {
            sessionStorage.setItem('employeeId', data.employeeId.toString());
            sessionStorage.setItem('doj', data.doj.toString());
            sessionStorage.setItem('designation', data.designation.toString());
            sessionStorage.setItem('userName', data.userName.toString());
            sessionStorage.setItem('empCode', data.code.toString());
            const masterdash = '/menu/dashboard';
            this.router.navigate([masterdash], { skipLocationChange: false });
          }
        }
      }
    );
  }

}
