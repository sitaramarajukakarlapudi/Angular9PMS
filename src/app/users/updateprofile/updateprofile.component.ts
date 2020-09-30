import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  uploadedFiles: any[] = [];
  constructor(
    private userSvc: UserService
  ) { }

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
    const uploadData = new FormData();
    uploadData.append('empCode', sessionStorage.getItem('empCode'));
    uploadData.append('myangFile', this.uploadedFiles[0], this.uploadedFiles[0].name);
    console.log(uploadData);
    this.userSvc.uploadImage(uploadData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
