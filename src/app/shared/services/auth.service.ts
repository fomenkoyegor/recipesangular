import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Token} from '../interfases/token';
import {User} from '../interfases/user';
import {Observable, of, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiBase;
  updateIsAuth: Subject<boolean> = new Subject();

  constructor(
    public httpClient: HttpClient,
    public router: Router
  ) {
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + 'auth/register', user);
  }

  login(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.baseUrl + 'auth/login', user)
      .pipe(
        tap(
          (res: Token) => {
            this.setToken(res.token);
            this.router.navigate(['/recipe']);
            this.updateIsAuth.next();
          }
        )
      );
  }

  setToken(token): void {
    localStorage.setItem('token', token);
  }

  getToken(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAuthentificated(): Observable<boolean> {
    return of(this.getToken());
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();
  }


  isValidToken() {
    localStorage.clear();
    this.updateIsAuth.next();
    this.router.navigate(['/auth/login']);
  }
}
