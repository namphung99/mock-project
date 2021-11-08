import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article.component';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ListArticleComponent,
    DateFormatPipe
  ],
  exports: [ListArticleComponent]
})
export class ListArticleModule { }
