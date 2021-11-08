import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ArticleDetailComponent
      }
    ]),
    CommonModule
  ],
  declarations: [ArticleDetailComponent]
})
export class ArticleDetailModule { }
