import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListArticleComponent],
  exports: [ListArticleComponent]
})
export class ListArticleModule { }
