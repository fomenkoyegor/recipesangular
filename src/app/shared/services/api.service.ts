import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Recipe} from '../interfases/recipe';
import {Category} from '../interfases/category';
import {Ingridient} from '../interfases/ingridient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiBase;

  updateFav = new Subject();

  constructor(
    private http: HttpClient
  ) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  getAllRecipe(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipe');
  }

  getAllRecipeFavorite(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipe/favorite');
  }

  getRecipeId(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.baseUrl + 'recipe/' + id);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(this.baseUrl + 'recipe/' + recipe._id, recipe);
  }

  getCategoryId(id): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + 'category/' + id);
  }

  addIngridient(ingridient: Ingridient, recipeId): Observable<Ingridient> {
    return this.http.post<Ingridient>(this.baseUrl + `recipe/${recipeId}/ingridient`, ingridient);
  }

  deleteIngridient(recipeId, ingridient_id): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl + `recipe/${recipeId}/ingridient/${ingridient_id}`);
  }

  updateIngridient(ingridient: Ingridient): Observable<Ingridient> {
    return this.http.patch<Ingridient>(this.baseUrl + `recipe/${ingridient.recipeId}/ingridient/${ingridient._id}`,ingridient);
  }

  favorite(favorite: boolean, id): Observable<Recipe> {
    return this.http.patch<Recipe>(this.baseUrl + 'recipe/' + id, {favorite});
  }

}
