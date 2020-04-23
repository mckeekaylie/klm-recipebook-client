import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  showAddRecipe: boolean;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
      this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.showAddRecipe = true;

    this.recipeService.addRecipe(this.recipeForm.value);

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
