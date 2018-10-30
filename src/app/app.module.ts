import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './modules/app.routing.module';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginPageComponent } from './pages/auth-page/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth-page/register-page/register-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { RecipePageComponent } from './pages/main-page/recipe-page/recipe-page.component';
import { FavoritePageComponent } from './pages/main-page/favorite-page/favorite-page.component';
import {AlertModule, BsDropdownModule} from 'ngx-bootstrap';
import {TokenInterceptor} from './shared/services/token.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card.component';
import { DelayDirective } from './shared/directives/delay.directive';
import { RecipeShowComponent } from './pages/main-page/recipe-page/recipe-show/recipe-show.component';
import { IngridientComponent } from './shared/components/ingridient/ingridient.component';
import { RecipeEditComponent } from './pages/main-page/recipe-page/recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MainPageComponent,
    AuthPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavComponent,
    RecipePageComponent,
    FavoritePageComponent,
    LoaderComponent,
    RecipeCardComponent,
    DelayDirective,
    RecipeShowComponent,
    IngridientComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
