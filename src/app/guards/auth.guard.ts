import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  users: User[] = null;
  constructor(private loginservice: LoginService) {}

  ngOnInit(): void {
    this.loginservice.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          userId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
      console.log(this.users);
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.users);
    return true;
  }
}
