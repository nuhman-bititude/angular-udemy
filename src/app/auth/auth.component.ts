import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  ngOnDestroy() {}
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email: string = form.value.email;
    const password: string = form.value.password;

    if (!this.isLogin) {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
      this.isLoading = false;
    }
    form.reset();
  }
  onHandleError() {
    this.store.dispatch(new AuthActions.HandleError());
  }
  private showErrorAlert(message: string) {}
}
