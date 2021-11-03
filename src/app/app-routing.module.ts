import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './feature-modules/create-article/create-article.component';
import { HomeComponent } from './feature-modules/home/home.component';
import { LoginComponent } from './feature-modules/login/login.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { RegisterComponent } from './feature-modules/register/register.component';

const routes: Routes = [

  {
    path:"login",
    component: LoginComponent,
  },
  {
    path:"register",
    component: RegisterComponent,
  },
  {
    path:"articles",
    component: CreateArticleComponent,
  },
  {
    path:"/:username",
    component:ProfileComponent,
  },
  {
    path:"",
    component: HomeComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
