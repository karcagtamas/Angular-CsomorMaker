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
  users: User[] = null;

  constructor(private loginservice: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginservice.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          userId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });
  }

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
      this.users.forEach(e => {
        if (username.value === e.username && password.value === e.password) {
          localStorage.setItem('userId', e.userId);
          this.loginservice.setToken(e);
          this.success = true;
          this.router.navigateByUrl('');
        }
      });

      /* this.loginservice.login(username.value, password.value).subscribe(res => {
        res.forEach(e => {
          const E = e as User;
          if (username.value === E.username && password.value === E.password) {
            localStorage.setItem('userId', E.userId);
            this.loginservice.setToken();
            this.success = true;
            this.router.navigateByUrl('');
          }
        });
      }); */

      if (this.success === false) {
        this.error = true;
      }
    }
  }
}
