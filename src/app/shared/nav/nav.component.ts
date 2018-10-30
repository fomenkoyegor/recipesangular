import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  updateIsAuth: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAuthentificated();
    this.updateIsAuth = this.authService.updateIsAuth.subscribe(
      () => this.isAuthentificated()
    );
  }

  isAuthentificated() {
    this.isAuth = !!localStorage.getItem('token');
  }

  ngOnDestroy(): void {
    this.updateIsAuth.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
    this.authService.updateIsAuth.next();
  }
}
