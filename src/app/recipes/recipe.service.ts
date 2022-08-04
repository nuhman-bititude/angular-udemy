import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Butter Egg Plant',
      'Curry recipe',
      'https://img.delicious.com.au/5aLcV7cG/del/2021/05/slow-roasted-butter-eggplant-curry-152139-2.jpg',
      [new Ingredient('Chicken', 5), new Ingredient('Butter', 2)]
    ),
    new Recipe(
      'Chicken',
      'Chicekn Gravy',
      'https://img.delicious.com.au/Iok992Gi/w759-h506-cfill/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
      [new Ingredient('Chicken', 2), new Ingredient('Peanut', 2)]
    ),
  ];
  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
