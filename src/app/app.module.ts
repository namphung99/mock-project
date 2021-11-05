import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ProfileComponent } from './feature-modules/profile/profile.component';
import { FavoritesComponent } from './feature-modules/favorites/favorites.component';
import { EditProfileComponent } from './feature-modules/edit-profile/edit-profile.component';
import { ListArticleComponent } from './share-modules/list-article/list-article.component';
import { ModalArticleComponent } from './feature-modules/modal-article/modal-article.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    FavoritesComponent,
    EditProfileComponent,
    ListArticleComponent,
    ModalArticleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
