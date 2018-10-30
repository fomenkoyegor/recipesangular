import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from '../pages/not-found-page/not-found-page.component';
import {MainPageComponent} from '../pages/main-page/main-page.component';
import {AuthPageComponent} from '../pages/auth-page/auth-page.component';
import {LoginPageComponent} from '../pages/auth-page/login-page/login-page.component';
import {RegisterPageComponent} from '../pages/auth-page/register-page/register-page.component';
import {RecipePageComponent} from '../pages/main-page/recipe-page/recipe-page.component';
import {FavoritePageComponent} from '../pages/main-page/favorite-page/favorite-page.component';
import {AuthGuard, NoAuthGuard} from '../shared/services/auth.guard';
import {RecipeShowComponent} from '../pages/main-page/recipe-page/recipe-show/recipe-show.component';
import {RecipeEditComponent} from '../pages/main-page/recipe-page/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'recipe', pathMatch: 'full'},
  {path: 'recipe', canActivate: [AuthGuard], component: RecipePageComponent},
  {path: 'recipe/:id', canActivate: [AuthGuard], component: RecipeShowComponent},
  {path: 'recipe/edit/:id', canActivate: [AuthGuard], component: RecipeEditComponent},
  {path: 'favorite', canActivate: [AuthGuard], component: FavoritePageComponent},
  {
    path: 'auth', canActivate: [NoAuthGuard], component: AuthPageComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: '**', redirectTo: 'login'},
    ]
  },
  {path: '**', component: NotFoundPageComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [

    RouterModule
  ]
})

export class AppRoutingModule {
}
