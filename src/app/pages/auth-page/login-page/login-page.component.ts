import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../shared/interfases/user';
import {Token} from '../../../shared/interfases/token';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registred']) {
          // ТЕПЕРЬ МОЖЕТЕ ЗАЙТИ НА СТРАНИЦУ ИСПОЛЬЗУЯ СВОИ ДАННЫЕ


        } else if (params['accesDenied']) {
          // Для начала авторизируйся
          console.log('you must login');

        } else if (params['sessionFailed']) {
          // Токен протух
          console.log('session invalid');
        }
      }
    );
  }

  onLogin() {
    const user: User = {
      email: 're@re.re',
      password: 'rerere'
    };
    this.authService.login(user).subscribe(
      (token: Token) => {
        console.log(token);
      }
    );
  }

}
