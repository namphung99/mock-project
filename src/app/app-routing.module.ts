import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalArticleComponent } from './feature-modules/modal-article/modal-article.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"home",
    pathMatch:"full"
  },
  {
    path: '',
    redirectTo: "login",
    pathMatch: 'full',
  },
  {
    path:"login",
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
    component: ModalArticleComponent,
  },
  {
    path:"profile/:username",
    component:ProfileComponent,
  },
  {
    path:"home",
    loadChildren: () => import("./feature-modules/home/home.module")
    .then(response => response.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
