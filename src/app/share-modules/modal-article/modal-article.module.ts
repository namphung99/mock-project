import { MarkdownModule } from 'ngx-markdown';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalArticleComponent } from './modal-article.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MarkdownModule.forChild(),
  ],
  declarations: [
    ModalArticleComponent
  ],
  exports: [ModalArticleComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ModalArticleModule { }
