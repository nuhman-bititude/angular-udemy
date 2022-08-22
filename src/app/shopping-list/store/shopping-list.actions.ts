import { Ingredient } from './../../shared/ingredient';
import { Action } from '@ngrx/store';
export const ADD_INCREDIENT = 'ADD_INCREDIENT';
export const ADD_INCREDIENTS = 'ADD_INCREDIENTS';
export const UPDATE_INCREDIENT = 'UPDATE_INCREDIENT';
export const DELETE_INCREDIENT = 'DELETE_INCREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INCREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INCREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INCREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INCREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActionsType =
  | AddIngredient
  | AddIngredients
  | DeleteIngredient
  | UpdateIngredient
  | StartEdit
  | StopEdit;
