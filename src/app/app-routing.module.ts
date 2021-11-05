import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/home/home.component';
import { ModalArticleComponent } from './feature-modules/modal-article/modal-article.component';
import { LoginComponent } from './feature-modules/Auth/login/login.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { RegisterComponent } from './feature-modules/Auth/register/register.component';

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
    path: '',
    redirectTo: "home",
    pathMatch: 'full',
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
