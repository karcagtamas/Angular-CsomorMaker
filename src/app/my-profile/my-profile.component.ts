import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  password = new FormControl('', [Validators.required, Validators.min(8)]);
  code = new FormControl('', [Validators.required]);
  success = '';
  alert = '';
  email = localStorage.getItem('user');
  constructor(private loginserivce: LoginService) {}

  ngOnInit() {}

  getErrorMessage(content: FormControl): string {
    return content.hasError('required')
      ? 'Kötelező megadni a jelszót'
      : content.hasError('min')
      ? 'Az jelszó hossza min 8-nak kell lennie'
      : '';
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
}
