import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    WildCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
