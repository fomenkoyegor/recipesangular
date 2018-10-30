import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../interfases/recipe';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
  }


  addToFavorite() {
    if (this.recipe.favorite === false) {
      this.apiService.favorite(true, this.recipe._id).subscribe(
        recipe => {
          this.recipe.favorite = true;
          this.apiService.updateFav.next();
        }
      );
    }
  }

  outFavorite() {
    if (this.recipe.favorite === true) {
      this.apiService.favorite(false, this.recipe._id).subscribe(
        recipe => {
          this.recipe.favorite = false;
          this.apiService.updateFav.next();
        }
      );
    }
  }

}
