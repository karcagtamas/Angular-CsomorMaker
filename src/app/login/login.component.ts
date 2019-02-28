import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit() {}

  getErrorMessage(content: FormControl, str: string) {
    if (str === 'pass') {
      return content.hasError('required') ? 'Kötelező megadni a jelszót' : '';
    } else if (str === 'username') {
      return content.hasError('required') ? 'Kötelező megadni a felhasználónevet' : '';
    } else {
      return '';
    }
  }
}
