import { Recipe } from './../recipe.model';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.action';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://recipe-book-10-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipeActions.SetRecipes(recipes);
      })
    )
  );

  saveRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.SAVE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actionData, recipeState]) => {
          return this.http.put(
            'https://recipe-book-10-default-rtdb.firebaseio.com/recipes.json',
            recipeState.recipes
          );
        }),
        map((resData) => {})
      ),
    { dispatch: false }
  );
}
