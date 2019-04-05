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
  constructor(private loginserivce: LoginService) {}

  ngOnInit() {}

  getErrorMessage(content: FormControl): string {
    return content.hasError('required')
      ? 'Kötelező megadni a jelszót'
      : content.hasError('min')
      ? 'Az jelszó hossza min 8-nak kell lennie'
      : '';
  }

  savePassword(password: FormControl, code: FormControl, passInput: HTMLInputElement, codeInput: HTMLInputElement) {
    if (!password.invalid && !code.invalid && this.codeIsValid(code.value)) {
      this.loginserivce
        .changePassword(password.value, code.value)
        .then(() => {
          passInput.value = '';
          codeInput.value = '';
          this.setAlert('A jelszó csere sikeres!', true);
        })
        .catch(() => {
          this.setAlert('A jelszó csere sikertelen!', false);
        });
    }
  }

  sendResetCode() {
    this.loginserivce
      .sendResetEmail()
      .then(() => {
        this.setAlert('Az kód sikeresen elküldve!', true);
      })
      .catch(err => {
        console.log(err);
        this.setAlert('A kód elküldés sikertelen!', false);
      });
  }

  codeIsValid(code: string) {
    this.loginserivce.codeIsValid(code).then(res => {
      console.log(res);
    });
    return false;
  }

  setAlert(value: string, isSuccess: boolean) {
    if (isSuccess) {
      this.success = value;
      setTimeout(() => (this.success = ''), 3000);
    } else {
      this.alert = value;
      setTimeout(() => (this.alert = ''), 3000);
    }
  }
}
