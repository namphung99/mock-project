import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './feature-modules/create-article/create-article.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature-modules/Auth/login/login.module').then(
        (response) => response.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./feature-modules/Auth/register/register.module').then(
        (response) => response.RegisterModule
      ),
  },
  {
    path: 'articles',
    component: CreateArticleComponent,
  },
  {
    path: 'profile/:username',
    loadChildren: () =>
      import('./feature-modules/profile-manage/profile/profile.module').then(
        (response) => response.ProfileModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import(
        './feature-modules/profile-manage/edit-profile/edit-profile.module'
      ).then((response) => response.EditProfileModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./feature-modules/home/home.module').then(
        (response) => response.HomeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
