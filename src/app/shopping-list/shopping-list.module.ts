import { SharedModule } from './../shared/sharded.module';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],

  imports: [
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    SharedModule,
    FormsModule,
  ],
  exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
