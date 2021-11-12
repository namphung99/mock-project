import { MarkdownModule } from 'ngx-markdown';
import { ModalDeleteArticleModule } from './../../share-modules/modal-delete-article/modal-delete-article.module';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    // MarkDownComponent
  ],
  imports: [
    CommonModule,
    ModalDeleteArticleModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticleDetailComponent
      }
    ]),
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
