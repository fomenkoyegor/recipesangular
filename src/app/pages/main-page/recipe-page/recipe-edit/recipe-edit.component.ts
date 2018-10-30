import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {Recipe} from '../../../../shared/interfases/recipe';
import {Category} from '../../../../shared/interfases/category';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  categories$: Observable<Category[]>;
  category: Category;
  recipeId;
  f: FormGroup;
  photoUrl;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.recipeId = id;
        this.loadCategories();
        this.loadRecipe(id);
      });


  }

  initForm(recipe: Recipe) {
    this.photoUrl = recipe.photoUrl;
    this.f = this.fb.group({
      'title': [recipe.title, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],

      'description': [recipe.description, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],

      'instructions': [recipe.instructions, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000)
      ])],

      'photoUrl': [recipe.photoUrl, Validators.compose([
        Validators.required
      ])],

      'categoryId': [recipe.categoryId, Validators.compose([
        Validators.required
      ])],

    });
  }

  onBack(e: Event) {
    e.preventDefault();
    window.history.back();
  }

  loadRecipe(recipe_id) {
    this.apiService.getRecipeId(recipe_id).subscribe(recipe => {
      this.recipe = recipe;
      this.initForm(recipe);
    });
  }

  loadCategories() {
    this.categories$ = this.apiService.getCategories();
  }


  onSubmit() {
    this.f.disable();
    const newRecipe: Recipe = {
      title: this.f.value.title,
      description: this.f.value.description,
      instructions: this.f.value.instructions,
      photoUrl: this.f.value.photoUrl,
      _id: this.recipe._id,
      categoryId: this.f.value.categoryId
    };
    this.apiService.updateRecipe(newRecipe).subscribe(
      (recipe: Recipe) => this.loadRecipe(recipe._id),
      (err) => console.log(err),
      () => this.f.enable()
    );
  }

  onChangeImg(e) {
    this.photoUrl = e.target.value;
  }

  onCategoryChange(e) {
    this.f.controls['categoryId'].setValue(e.target.value);
  }

  findCatName(categories: Category[]): string {
    const category = categories.find(c => c._id === this.recipe.categoryId);
    return category.name;
  }
}
