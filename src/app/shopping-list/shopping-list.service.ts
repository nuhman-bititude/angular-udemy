import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient';
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 50),
    new Ingredient('Banana', 12),
  ];
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients;
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
