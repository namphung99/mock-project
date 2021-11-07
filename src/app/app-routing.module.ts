import { LoginGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CreateArticleComponent } from './feature-modules/create-article/create-article.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full',
  },
  {
    path:"login",
    canActivate:[LoginGuard],
    loadChildren: () => import("./feature-modules/Auth/login/login.module")
    .then(response => response.LoginModule)
  },
  {
    path:"register",
    loadChildren: () => import("./feature-modules/Auth/register/register.module")
    .then(response => response.RegisterModule)
  },
  {
    path:"articles",
    component: CreateArticleComponent,
  },
  {
    path:"profile/:username",
    component:ProfileComponent,
  },
  {
    path:"home",
    loadChildren: () => import("./feature-modules/home/home.module")
    .then(response => response.HomeModule)
  },
  {
    path:"article-detail",
    loadChildren: () => import("./feature-modules/article-detail/article-detail.module")
    .then(response => response.ArticleDetailModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
