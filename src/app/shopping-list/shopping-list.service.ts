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
    // check for duplicate ingredients
    // for (let i = 0; i < ingredients.length; i++) {
    //   if (this.ingredients.includes(ingredients[i])) {
    //     this.ingredients.push(ingredients[i]);
    //   } else {
    this.ingredients.push(...ingredients);
    // }
  }
}
// }
