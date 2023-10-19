import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  DxGalleryModule,
  DxButtonModule,
  DxToastModule,
  DxPopupModule,
} from 'devextreme-angular';
import { NavigationComponent } from './navigation/navigation.component';
import { FavoriteViewComponent } from './favorite-view/favorite-view.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { WildCardComponent } from './wild-card/wild-card.component';
import { SearchWindowComponent } from './search-window/search-window.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FavoriteViewComponent,
    HomeComponentComponent,
    WildCardComponent,
    SearchWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // devExtreme imports below
    DxGalleryModule,
    DxButtonModule,
    DxToastModule,
    DxPopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
