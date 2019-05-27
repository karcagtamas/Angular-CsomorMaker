import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/users.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  success = '';
  alert = '';
  uploadedFile: File = null;
  user = new User();
  imageUrl = '../../assets/images/profile.png';
  nameOnModify = false;
  nameModify = '';
  imageOnModify = false;

  constructor(private loginserivce: LoginService) {}

  ngOnInit() {
    this.loginserivce.getUser().then(res => {
      this.user = res;
      console.log(this.user.name);

      this.getImage();
    });
  }

  sendResetCode() {
    this.loginserivce
      .sendResetEmail()
      .then(() => {
        this.setAlert('Az kód sikeresen elküldve! Ellenőrizze e-mail fiókját!', true);
      })
      .catch(err => {
        console.log(err);
        this.setAlert('A kód elküldés sikertelen!', false);
      });
  }

  setAlert(value: string, isSuccess: boolean) {
    if (isSuccess) {
      this.success = value;
      setTimeout(() => (this.success = ''), 5000);
    } else {
      this.alert = value;
      setTimeout(() => (this.alert = ''), 5000);
    }
  }

  upload(file: File) {
    console.log(file);
    return new Promise(resolve => {
      if (file) {
        this.loginserivce
          .uploadImage(file, this.user.id)
          .then(res => {
            if (res) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }

  getImage() {
    this.loginserivce.getImage(this.user.imageName).then(res => {
      this.imageUrl = res;
      console.log(res);
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    this.uploadedFile = file;
  }

  saveModify() {
    if (this.nameOnModify) {
      console.log(this.nameModify);
      if (this.nameModify) {
        this.loginserivce.updateName(this.nameModify, this.user.id).then(() => {
          this.user.name = this.nameModify;
          this.nameModify = '';
          this.nameOnModify = false;
        });
      }
    } else if (this.imageOnModify) {
      this.upload(this.uploadedFile).then(res => {
        if (res) {
          this.imageOnModify = false;
          this.uploadedFile = null;
          this.user.imageName = this.uploadedFile.name;
          this.getImage();
        }
      });
    }
  }
}
