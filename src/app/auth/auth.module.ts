import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    FormsModule,
    CommonModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
