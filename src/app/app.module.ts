import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  DxDrawerModule,
  DxListModule,
  DxRadioGroupModule,
  DxToolbarModule,
  DxGalleryModule,
} from 'devextreme-angular';
import { NavigationComponent } from './navigation/navigation.component';
import { FavoriteViewComponent } from './favorite-view/favorite-view.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { WildCardComponent } from './wild-card/wild-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FavoriteViewComponent,
    HomeComponentComponent,
    WildCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // devExtreme imports below
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxGalleryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
