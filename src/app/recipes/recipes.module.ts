import { RecipesRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDeatailComponent } from './recipe-deatail/recipe-deatail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/sharded.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    RecipeStartComponent,
    RecipeEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDeatailComponent,
    RecipeItemComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    NgxImageZoomModule,
  ],
  exports: [
    RecipeStartComponent,
    RecipeEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDeatailComponent,
    RecipeItemComponent,
  ],
})
export class RecipesModule {}
