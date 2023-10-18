import { Component, OnInit } from '@angular/core';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.scss'],
})
export class FavoriteViewComponent implements OnInit {
  favoriteMoviesArray: TrendingFilm[] = [];
  constructor(private state: State) {}

  ngOnInit(): void {
    // get favorite films on init
    this.favoriteMoviesArray = this.state.getLikedMovies();
    console.log(this.favoriteMoviesArray);
  }
}
