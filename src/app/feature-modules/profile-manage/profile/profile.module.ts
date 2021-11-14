import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListArticleModule } from 'src/app/share-modules/list-article/list-article.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
  declarations: [
    ProfileComponent],
  imports: [
    ListArticleModule,
    ProfileRoutingModule,
    CommonModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule { }
