import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  private storeSub = Subscription;
  ngOnInit() {
    //FIXME: (Type 'Subscription' is missing the following properties from type 'typeof Subscription': prototype, EMPTYts(2739)) this.storeSub =
    this.store.select('auth').subscribe((authState) => {
      console.log(authState);
      this.isLoading = authState.loading;
      this.error = authState.authError;
      console.log(this.error);
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  ngOnDestroy() {
    if (this.storeSub) {
      console.log(this.storeSub);
      // this.storeSub.unSubscribe();
    }
  }
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
    this.error = null;
  }
  private showErrorAlert(message: string) {}
}
