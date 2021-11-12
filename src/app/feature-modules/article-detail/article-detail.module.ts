import { ModalDeleteArticleModule } from './../../share-modules/modal-delete-article/modal-delete-article.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleDetailComponent } from './article-detail.component';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

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
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    })
  ],
  exports: [RouterModule, ArticleDetailComponent]
})
export class ArticleDetailModule { }
