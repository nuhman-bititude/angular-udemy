import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const SAVE_RECIPES = '[Recipes] Save Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const ADD_RECIPE = '[Recipes] Add Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPES;
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export type RecipeActionType =
  | SetRecipes
  | FetchRecipes
  | UpdateRecipes
  | DeleteRecipes
  | AddRecipe
  | SaveRecipes;
