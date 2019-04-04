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
}
