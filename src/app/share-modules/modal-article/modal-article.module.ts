import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalArticleComponent } from './modal-article.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ModalArticleComponent,
  ],
  exports: [ModalArticleComponent]
})
export class ModalArticleModule { }
