import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteArticleComponent } from './modal-delete-article.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ModalDeleteArticleComponent],
  exports: [ModalDeleteArticleComponent],
})
export class ModalDeleteArticleModule { }
