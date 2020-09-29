import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  uploadedFiles: any[] = [];
  constructor() { }

  ngOnInit() {

  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  removeImage() {
    this.uploadedFiles = [];
  }

  btnSubmit_Click() {

  }


}
