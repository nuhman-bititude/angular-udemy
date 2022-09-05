import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as RecipeActions from '../store/recipe.action';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-deatail',
  templateUrl: './recipe-deatail.component.html',
  styleUrls: ['./recipe-deatail.component.css'],
})
export class RecipeDeatailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  imageUrl: string;
  scaleRange: number;
  rotateAngle: number;
  xValue: number;
  yValue: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.scaleRange = 1;
      this.rotateAngle = 0;
      this.store
        .select('recipe')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          this.recipe = recipe;
          this.imageUrl = this.recipe.imagePath;
        });
    });
  }
  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  valueChanged(value: number) {
    if (value === 1) {
      this.scaleRange = 1;
    } else {
      this.scaleRange = value;
    }
  }

  onDecrease() {
    if (this.scaleRange <= 1) {
      this.scaleRange = 1;
    } else {
      this.scaleRange = this.scaleRange - 1;
    }
  }
  onIncrease() {
    if (this.scaleRange >= 10) {
      this.scaleRange = 10;
    } else {
      this.scaleRange = this.scaleRange + 1;
    }
  }
  onRotate() {
    this.scaleRange = 1;
    this.rotateAngle = this.rotateAngle + 90;
  }

  scroll(magnification: number) {
    this.scaleRange = magnification;
  }
  mouseMove(event) {
    this.xValue = event.x;
    this.yValue = event.y;
  }
}
