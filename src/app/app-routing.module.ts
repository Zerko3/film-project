import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { WildCardComponent } from './wild-card/wild-card.component';
import { FavoriteViewComponent } from './favorite-view/favorite-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponentComponent,
  },
  {
    path: 'favoriteFilms',
    component: FavoriteViewComponent,
  },
  {
    path: '**',
    component: WildCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
