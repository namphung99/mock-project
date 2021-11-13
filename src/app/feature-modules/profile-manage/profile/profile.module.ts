import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ListArticleModule } from 'src/app/share-modules/list-article/list-article.module';
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
