import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubcription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSubcription = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !user ? false : true;
      });
  }
  onSaveData() {
    this.store.dispatch(new RecipeActions.SaveRecipes());
  }
  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
