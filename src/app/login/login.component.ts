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
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error = false;
  success = false;

  constructor(private loginservice: LoginService, private router: Router) {}

  ngOnInit() {}

  getErrorMessage(content: FormControl, str: string): string {
    if (str === 'pass') {
      return content.hasError('required') ? 'Kötelező megadni a jelszót' : '';
    } else if (str === 'username') {
      return content.hasError('required') ? 'Kötelező megadni a felhasználónevet' : '';
    } else {
      return '';
    }
  }

  login(username: FormControl, password: FormControl): void {
    if (username.valid && password.valid) {
      this.loginservice.login(username.value, password.value).subscribe(res => {
        res.forEach(e => {
          const E = e as User;
          if (username.value === E.username && password.value === E.password) {
            localStorage.setItem('userId', E.userId);
            this.loginservice.setToken();
            this.success = true;
            this.router.navigateByUrl('');
          }
        });
      });

      if (this.success === false) {
        this.error = true;
      }
    }
  }
}
