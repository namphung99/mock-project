import { ListArticleModule } from './../../share-modules/list-article/list-article.module';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ModalArticleModule } from 'src/app/share-modules/modal-article/modal-article.module';

@NgModule({
  declarations: [
   HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ListArticleModule,
    ModalArticleModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class HomeModule {}
