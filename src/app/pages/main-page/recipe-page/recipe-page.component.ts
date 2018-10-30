import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {Observable} from 'rxjs';
import {Recipe} from '../../../shared/interfases/recipe';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  recipe$: Observable<Recipe[]>;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['accesDenied']) {
          // Уже зарегестророваный
          alert('you loged');
        }
      }
    );
    this.recipe$ = this.apiService.getAllRecipe();
  }

}
