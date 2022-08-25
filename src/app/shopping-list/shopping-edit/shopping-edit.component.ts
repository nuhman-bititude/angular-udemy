import { Ingredient } from './../../shared/ingredient';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingListForm: NgForm;

  editMode = false;

  editedItem: Ingredient;
  itemName: string;
  itemAmount: number;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((statedata) => {
      if (statedata.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = statedata.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }
  onClearForm() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.shoppingListForm.reset();
  }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
