import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  error = false;
  success = false;
  users: User[] = null;

  constructor(private loginservice: LoginService, private router: Router) {}

  ngOnInit() {}

  getErrorMessage(content: FormControl, str: string): string {
    if (str === 'pass') {
      return content.hasError('required') ? 'Kötelező megadni a jelszót' : '';
    } else if (str === 'email') {
      return content.hasError('required')
        ? 'Kötelező megadni az e-mail címet'
        : content.hasError('email')
        ? 'Az e-mail cím nem megfelelő'
        : '';
    } else {
      return '';
    }
  }

  login(email: FormControl, password: FormControl): void {
    this.error = false;
    if (email.valid && password.valid) {
      this.loginservice
        .login(email.value, password.value)
        .then(() => {
          console.log('Belépés sikeres');
          localStorage.setItem('user', email.value);
          this.loginservice.isAdmin();
          this.error = false;
          this.router.navigateByUrl('/home');
        })
        .catch(() => {
          console.log('Belépés sikertelen');
          this.error = true;
        });
    }
  }
}
