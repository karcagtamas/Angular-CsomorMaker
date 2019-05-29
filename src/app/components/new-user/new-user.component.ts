import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  success = false;
  error = false;

  constructor(private loginservice: LoginService, private userservice: UserService) {}

  ngOnInit() {}

  getErrorMessage(content: FormControl): string {
    return content.hasError('required')
      ? 'Kötelező megadni az e-mail címet'
      : content.hasError('email')
      ? 'Az e-mail cím nem megfelelő'
      : '';
  }

  saveUser(email: FormControl, input: HTMLInputElement) {
    this.error = false;
    this.success = false;
    if (!email.invalid) {
      this.loginservice
        .registration(email.value)
        .then(() => {
          this.userservice.saveUser(email.value);
          this.success = true;
          input.value = '';
          setTimeout(() => (this.success = false), 3000);
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
}
