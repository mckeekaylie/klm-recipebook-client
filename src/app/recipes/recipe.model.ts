import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public instructions: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, instructions: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.instructions = instructions;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}