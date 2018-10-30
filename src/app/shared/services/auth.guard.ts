import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthentificated()
      .pipe(
        tap(bool => {
          if (!bool) {
            this.router.navigate(['auth/login'], {
              queryParams: {accesDenied: true}
            });
          }
        })
      );
  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }

}

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(private  authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthentificated()
      .pipe(tap(bool => {
          if (bool) {
            this.router.navigate(['recipe']);
          }
        }
      ))
      .pipe(map(e => !e));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

}
