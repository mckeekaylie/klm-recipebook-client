import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ){}

    fetchRecipes() {
        console.log('fetchRecipes!')
        this.http.get<Recipe[]>('https://klm-recipebook-app.firebaseio.com/recipes.json')
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://klm-recipebook-app.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response)
        })
    }
}