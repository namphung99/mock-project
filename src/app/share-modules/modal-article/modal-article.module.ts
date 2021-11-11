import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalArticleComponent } from './modal-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LMarkdownEditorModule,
    FormsModule
  ],
  declarations: [
    ModalArticleComponent,
  ],
  exports: [ModalArticleComponent]
})
export class ModalArticleModule { }
