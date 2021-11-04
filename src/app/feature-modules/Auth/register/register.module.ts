import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register.component";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: RegisterComponent,
      }
    ]),
    CommonModule,
    ReactiveFormsModule
]
})
export class RegisterModule {}
