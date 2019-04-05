import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: User[] = [];
  thisUser = localStorage.getItem('user');
  success = '';
  alert = '';

  constructor(private loginservice: LoginService) {}

  ngOnInit() {
    this.loginservice.getUsers().subscribe(data => {
      this.Users = data.map(d => {
        return {
          id: d.payload.doc.id,
          ...d.payload.doc.data()
        } as User;
      });
    });
  }

  setSuccess(value: string) {
    this.success = value;
    setTimeout(() => {
      this.success = '';
    }, 3000);
  }

  setAlert(value: string) {
    this.alert = value;
    setTimeout(() => {
      this.alert = '';
    }, 3000);
  }

  deleteUser(id: string) {
    this.loginservice
      .deleteUser(id)
      .then(() => {
        this.setSuccess('A felhasználó törlése sikeres!');
      })
      .catch(() => {
        this.setAlert('A felhasználó törlése sikertelen! Kérjük próbálja újra késöbb!');
      });
  }

  setAdmin(id: string, state: boolean) {
    const newstate = state ? false : true;
    this.loginservice
      .setAdmin(id, newstate)
      .then(() => {
        this.setSuccess('A felhasználó admin rangja sikeresen megváltozott!');
      })
      .catch(() => {
        this.setAlert('A felhasználó admin állapotának megváltoztatása sikertelen! Kérjük próbálja újra késöbb!');
      });
  }
}
