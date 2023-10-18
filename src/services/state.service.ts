import { Injectable } from '@angular/core';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class State {
  favoriteMoviesArray: TrendingFilm[] = [];

  constructor() {}

  // get the liked movies in the home component and pass them into the favoriteMoviesArray
  storeLikedMoviesOnUserClick(likedMovie: TrendingFilm) {
    // 1. pass the liked movie into the array
    this.favoriteMoviesArray.push(likedMovie);
  }

  // get the array of liked movies
  getLikedMovies() {
    return this.favoriteMoviesArray.slice();
  }
}
