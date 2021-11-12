import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    // MarkDownComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticleDetailComponent
      }
    ]),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    MarkdownModule.forChild(),
    LMarkdownEditorModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, ArticleDetailComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ArticleDetailModule { }
