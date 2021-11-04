import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/home/home.component';
import { LoginComponent } from './feature-modules/login/login.component';
import { ModalArticleComponent } from './feature-modules/modal-article/modal-article.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { RegisterComponent } from './feature-modules/register/register.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"home",
    pathMatch:"full"
  },
  {
    path:"home",
    component: HomeComponent,
  },
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
    component: ModalArticleComponent,
  },
  {
    path:":username",
    component:ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
