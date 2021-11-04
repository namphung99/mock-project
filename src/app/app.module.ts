import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './feature-modules/login/login.component';
import { RegisterComponent } from './feature-modules/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { FavoritesComponent } from './feature-modules/favorites/favorites.component';
import { EditProfileComponent } from './feature-modules/edit-profile/edit-profile.component';
import { ListArticleComponent } from './share-modules/list-article/list-article.component';
import { ModalArticleComponent } from './feature-modules/modal-article/modal-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FavoritesComponent,
    EditProfileComponent,
    ListArticleComponent,
    ModalArticleComponent
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
