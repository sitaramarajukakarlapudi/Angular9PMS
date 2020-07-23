import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      firstname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onSubmit(value: string) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

}
