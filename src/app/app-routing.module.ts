import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalArticleComponent } from './share-modules/modal-article/modal-article.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full',
  },
  {
    path:"login",
    canActivate:[AuthGuard],
    loadChildren: () => import("./feature-modules/Auth/login/login.module")
    .then(response => response.LoginModule)
  },
  {
    path:"register",
    canActivate:[AuthGuard],
    loadChildren: () => import("./feature-modules/Auth/register/register.module")
    .then(response => response.RegisterModule)
  },
  {
    path:"article/:slug",
    loadChildren: () => import("./feature-modules/article-detail/article-detail.module")
    .then(response => response.ArticleDetailModule)
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
