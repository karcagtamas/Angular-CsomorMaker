import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

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
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.loginservice
      .logout()
      .then(() => {
        window.alert('Sikeres kijelenkezés!');
        this.router.navigateByUrl('/login');
      })
      .catch(() => {
        window.alert('Sikeretelen kijelentkezés!');
      });
  }
  isLoggedIn() {
    console.log(this.loginservice.isLoggedIn());
    return this.loginservice.isLoggedIn();
  }
}
