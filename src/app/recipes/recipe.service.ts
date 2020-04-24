import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger',
            'grill until brown',
            [new Ingredient ('patty', 4), new Ingredient('bun', 4)]
        ),
        new Recipe(
            'Taco',
            'cook meat until brown, season',
            [new Ingredient ('meat', 1), new Ingredient('shells', 4)]
        )
    ]

    // constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes;
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipeById(){
        console.log(this.recipes)
        let loopId = 0;
        for(let i = 0; i < this.recipes.length; i++){
            // return loopId = i;
            console.log(loopId = i);
        }
        return this.recipes[loopId]
    }

    addRecipe(recipe: Recipe){
        console.log(recipe);
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updatedRecipe: Recipe){
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}