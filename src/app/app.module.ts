import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './feature-modules/login/login.component';
import { RegisterComponent } from './feature-modules/register/register.component';
import { ArticleComponent } from './share-modules/article/article.component';
import { CreateArticleComponent } from './feature-modules/create-article/create-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { FavoritesComponent } from './feature-modules/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ArticleComponent,
    CreateArticleComponent,
    ProfileComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
