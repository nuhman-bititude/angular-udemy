import { Ingredient } from './../../shared/ingredient';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initailState: State = {
  ingredients: [new Ingredient('Apple', 50), new Ingredient('Banana', 12)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state = initailState,
  action: ShoppingListActions.ShoppingListActionsType
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INCREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case ShoppingListActions.ADD_INCREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload], // ... in Action is to remove array inside array
      };
    }
    case ShoppingListActions.UPDATE_INCREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case ShoppingListActions.DELETE_INCREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
          return ingredientIndex != state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case ShoppingListActions.START_EDIT: {
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedUngredientIndex: -1,
      };
    }

    default: {
      return state;
    }
  }
}
