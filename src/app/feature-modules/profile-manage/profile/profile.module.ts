import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ListArticleModule } from 'src/app/share-modules/list-article/list-article.module';

@NgModule({
  declarations: [
    ProfileComponent],
  imports: [
    ListArticleModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
    CommonModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
