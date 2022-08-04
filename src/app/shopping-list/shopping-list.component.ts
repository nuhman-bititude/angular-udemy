import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
