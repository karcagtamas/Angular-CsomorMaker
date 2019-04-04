import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.loginservice.isAdmin());
    // return true;
    return new Promise(resolve => {
      this.loginservice
        .isAdmin()
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigateByUrl('/home');
            resolve(false);
          }
        })
        .catch(() => resolve(false));
    });
  }
}
