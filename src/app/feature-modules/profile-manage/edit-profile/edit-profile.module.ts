import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EditProfileComponent,
      }
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule { }
