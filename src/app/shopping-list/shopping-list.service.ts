import { Ingredient } from './../shared/ingredient';
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 50),
    new Ingredient('Banana', 12),
  ];

  getIngredients() {
    return this.ingredients;
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }
}
// }
