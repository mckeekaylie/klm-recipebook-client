import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public instructions: string;
    public ingredients: Ingredient[];

    constructor(name: string, instructions: string, ingredients: Ingredient[]){
        this.name = name;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }
}