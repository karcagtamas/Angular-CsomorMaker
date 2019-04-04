import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

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
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.getIsLoggedIn();
      this.getEmail();
    }, 30000);
  }

  stopInterval() {
    clearInterval(this.interval);
  }
}
