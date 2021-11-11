import { ModalDeleteArticleModule } from './../../share-modules/modal-delete-article/modal-delete-article.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ArticleDetailComponent,
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
  ],
  exports: [RouterModule, ArticleDetailComponent]
})
export class ArticleDetailModule { }
