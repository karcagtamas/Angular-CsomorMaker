import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/users.model';

const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  success = '';
  alert = '';
  uploadedFile: File = null;
  user = new User('');
  imageUrl = '../../assets/images/profile.png';
  nameOnModify = false;
  nameModify = '';
  imageOnModify = false;

  constructor(private userservice: UserService, private loginservice: LoginService) {}

  ngOnInit() {
    this.userservice.getUser().then(res => {
      this.user = res;
      this.getImage();
    });
  }

  sendResetCode() {
    this.loginservice
      .sendResetEmail()
      .then(() => {
        this.setAlert('Az kód sikeresen elküldve! Ellenőrizze e-mail fiókját!', true);
      })
      .catch(err => {
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
    return new Promise(resolve => {
      if (file && TYPES.includes(file.type)) {
        this.userservice
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
    this.userservice.getImage(this.user.imageName).then(res => {
      this.imageUrl = res;
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.uploadedFile = file;
  }

  saveModify() {
    if (this.nameOnModify) {
      if (this.nameModify) {
        this.userservice.updateName(this.nameModify, this.user.id).then(() => {
          this.user.name = this.nameModify;
          this.nameModify = '';
          this.nameOnModify = false;
        });
      }
    } else if (this.imageOnModify) {
      this.upload(this.uploadedFile).then(res => {
        if (res) {
          this.imageOnModify = false;
          this.user.imageName = this.uploadedFile.name;
          this.uploadedFile = null;
          this.getImage();
        }
      });
    }
  }
}
