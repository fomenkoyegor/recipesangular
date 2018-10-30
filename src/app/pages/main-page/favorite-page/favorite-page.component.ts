import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Observable, Subscription} from 'rxjs';
import {Recipe} from '../../../shared/interfases/recipe';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  updateFav: Subscription;
  recipes$: Observable<Recipe[]>;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.getFav();
    this.updateFav = this.apiService.updateFav.subscribe(
      () => this.getFav()
    );
  }

  getFav() {
    this.recipes$ = this.apiService.getAllRecipeFavorite();
  }

  ngOnDestroy(): void {
    this.updateFav.unsubscribe();
  }
}
