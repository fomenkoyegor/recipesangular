import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {Recipe} from '../../../../shared/interfases/recipe';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Category} from '../../../../shared/interfases/category';
import {Ingridient} from '../../../../shared/interfases/ingridient';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss']
})
export class RecipeShowComponent implements OnInit {
  recipe: Recipe;
  category: Category;
  isAdd: boolean;
  newIngridient: string;
  isEditTitle: boolean;
  oldRecipeTitle;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.apiService.getRecipeId(id).subscribe(
          (recipe: Recipe) => {
            this.recipe = recipe;
            this.apiService.getCategoryId(recipe.categoryId).subscribe(
              (category: Category) => this.category = category
            );
          }
        );
      }
    );

  }

  onDeleteIng(id) {
    const idx = this.recipe.ingridients.findIndex(el => el._id === id);
    this.recipe.ingridients.splice(idx, 1);
  }

  onSave() {
    const newIngridient: Ingridient = {
      name: this.newIngridient,
      recipeId: this.recipe._id
    };
    this.apiService.addIngridient(newIngridient, this.recipe._id).subscribe(
      (ingridient: Ingridient) => {
        this.recipe.ingridients.push(ingridient);
        this.newIngridient = '';
        this.isAdd = false;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isAdd = false;
      }
    );

  }

  onEditTitle() {
    this.isEditTitle = true;
    this.oldRecipeTitle = this.recipe.title;
  }

  onCancelTitle() {
    this.isEditTitle = false;
    this.recipe.title = this.oldRecipeTitle;
  }

  onSaveTitle() {
    if (this.recipe.title && this.recipe.title !== this.oldRecipeTitle) {
      const newRecipe: Recipe = {
        title: this.recipe.title,
        _id: this.recipe._id
      };
      this.apiService.updateRecipe(newRecipe).subscribe(
        (recipe: Recipe) => {
          this.recipe.title = recipe.title;
          this.isEditTitle = false;
        }
      );
    } else {
      this.isEditTitle = false;
    }
  }
}
