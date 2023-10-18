import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  DxDrawerModule,
  DxListModule,
  DxRadioGroupModule,
  DxToolbarModule,
  DxGalleryModule,
  DxButtonModule,
  DxFormModule,
  DxTreeListModule,
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
    FormsModule,

    // devExtreme imports below
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxGalleryModule,
    DxButtonModule,
    DxFormModule,
    DxTreeListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
