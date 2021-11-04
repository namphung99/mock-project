import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      }
    ]),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {}
