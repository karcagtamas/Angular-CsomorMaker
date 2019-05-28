import { LoginService } from 'src/app/services/login.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isLoggedIn = false;
  isAdmin = false;
  email = '';
  interval;

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userservice: UserService,
    private loginservice: LoginService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getIsLoggedIn();
    this.getEmail();
    this.getIsAdmin();
    this.stopInterval();
    this.startInterval();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.stopInterval();
  }

  logout(): void {
    this.loginservice
      .logout()
      .then(() => {
        window.alert('Sikeres kijelenkezés!');
        localStorage.setItem('user', '');
        this.router.navigateByUrl('/login');
        this.getIsLoggedIn();
        this.getEmail();
        this.getIsAdmin();
      })
      .catch(() => {
        window.alert('Sikeretelen kijelentkezés!');
      });
  }
  getIsLoggedIn() {
    this.loginservice.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    });
  }

  getEmail() {
    this.email = localStorage.getItem('user');
  }

  getIsAdmin() {
    this.userservice
      .isAdmin()
      .then(res => {
        if (res) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
      .catch(() => (this.isAdmin = false));
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.getIsLoggedIn();
      this.getEmail();
      this.getIsAdmin();
    }, 30000);
  }

  stopInterval() {
    clearInterval(this.interval);
  }
}
