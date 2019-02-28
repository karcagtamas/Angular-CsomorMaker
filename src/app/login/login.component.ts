import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit() {}

  getErrorMessage() {
    return this.username.hasError('required') ? 'Kötelező megadni a felhasználó nevet' : '';
  }
}
