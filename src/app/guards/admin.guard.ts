import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userservice: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    } */

    return new Promise(resolve => {
      this.userservice
        .isAdmin()
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigateByUrl('/home');
            resolve(false);
          }
        })
        .catch(() => {
          this.router.navigateByUrl('/home');
          resolve(false);
        });
    });
  }
}
