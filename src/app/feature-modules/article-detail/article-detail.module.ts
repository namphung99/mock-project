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
    RouterModule.forChild([
      {
        path: '',
        component: ArticleDetailComponent
      }
    ]),
  ],
  exports: [RouterModule]
})
export class ArticleDetailModule { }
