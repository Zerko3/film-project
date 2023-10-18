import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class State {
  favoriteMoviesArray: TrendingFilm[] = [];

  // subjects
  updatedFavoriteMoviesArraySubject = new Subject<TrendingFilm[]>();

  constructor() {}

  // get the liked movies in the home component and pass them into the favoriteMoviesArray
  storeLikedMoviesOnUserClick(likedMovie: TrendingFilm) {
    // 1. pass the liked movie into the array
    this.favoriteMoviesArray.push(likedMovie);
  }

  removeAfilmFromFavoritesArray(selectedFilm: TrendingFilm) {
    console.log(selectedFilm);

    let indexOfSelcetedFilm = this.favoriteMoviesArray.indexOf(selectedFilm);

    this.favoriteMoviesArray.splice(indexOfSelcetedFilm, 1);

    // pass the new array into the subject -> we need to update the DOM as soon as we delete it for better UX
    this.updatedFavoriteMoviesArraySubject.next(this.favoriteMoviesArray);

    // we need to overrite this array here
    return this.favoriteMoviesArray;
  }

  // get the array of liked movies
  getLikedMovies() {
    return this.favoriteMoviesArray.slice();
  }
}
