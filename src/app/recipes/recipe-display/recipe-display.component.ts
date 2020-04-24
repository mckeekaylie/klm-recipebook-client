import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  id: any;

  showAddRecipe: boolean;
  recipeAddForm: FormGroup;

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchRecipes();
    this.recipes = this.recipeService.getRecipes();
    this.id = 0;

    this.initForm();
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  private initForm() {
    console.log('initform called')

    const allRecipes = this.recipeService.getRecipes();
    console.log(allRecipes)
    const recipe = this.recipeService.getRecipe(this.id);
    console.log(recipe)

    let recipeName = '';
    let recipeInstructions = '';
    let recipeIngredients = new FormArray([]);

      for(let formIngredient of recipe.ingredients){ //loops through all ingredients
        recipeIngredients.push(
          new FormGroup({
            ingredientName: new FormControl(formIngredient.name),
            ingredientAmount: new FormControl(formIngredient.amount)
          })
        )
      }
    

    this.recipeAddForm = new FormGroup({
      name: new FormControl(recipeName),
      instructions: new FormControl(recipeInstructions),
      ingredients: recipeIngredients
      // ingredients: new FormGroup({ingredientName: new FormControl(), ingredientAmount: new FormControl()})
      // ingredients: new FormGroup({ingredientName: new FormControl(recipeIngredients), ingredientAmount: new FormControl(recipeIngredients)})
    })

  }

  toggleAddRecipe(){
    if(this.showAddRecipe){
      this.showAddRecipe = false;
    } else {
      this.showAddRecipe = true;
    }
  }

  onAddRecipeSubmit(){
    console.log('submitted!')
    this.recipeService.addRecipe(this.recipeAddForm.value);
    this.dataStorageService.storeRecipes();
    this.recipeAddForm.reset();
    this.onCancel();
  }

  onCancel(){
    this.showAddRecipe = false;
  }

  onAddIngredient(){
    (<FormArray>this.recipeAddForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeAddForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
