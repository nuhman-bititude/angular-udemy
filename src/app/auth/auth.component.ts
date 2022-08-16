import { AuthService, AuthResponceData } from './auth.service';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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

    let authObseravable: Observable<AuthResponceData>;

    if (!this.isLogin) {
      authObseravable = this.authService.signup(email, password);
    } else {
      authObseravable = this.authService.login(email, password);
      this.isLoading = false;
    }

    authObseravable.subscribe(
      (responce) => {
        // console.log(responce);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
        form.reset();
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
  }
  onHandleError() {
    this.error = null;
  }
  private showErrorAlert(message: string) {}
}
