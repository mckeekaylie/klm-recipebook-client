import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-individual',
  templateUrl: './recipe-individual.component.html',
  styleUrls: ['./recipe-individual.component.css']
})
export class RecipeIndividualComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void {
  }

}
