import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class State {
  favoriteMoviesArray: TrendingFilm[] = [];

  // subjects
  updatedFavoriteMoviesArraySubject = new Subject<TrendingFilm[]>();

  constructor() {}

  // TODO:

  // 2. Make the design responsive
  // 3. Make some UX changes, when adding to favorite, make some toast and icon animation, aswell as removeing

  // get the liked movies in the home component and pass them into the favoriteMoviesArray
  storeLikedMoviesOnUserClick(likedMovie: TrendingFilm) {
    console.log(likedMovie);
    // 1. pass the liked movie into the array
    this.favoriteMoviesArray.push(likedMovie);

    // // 2. set the local storage in here, we pass the array into the local storage
    localStorage.setItem(
      'storedLikedMovies',
      JSON.stringify(this.favoriteMoviesArray)
    );
  }

  removeAfilmFromFavoritesArray(selectedFilm: TrendingFilm) {
    console.log(selectedFilm);
    console.log(this.favoriteMoviesArray);

    // loop over the array, if the id of the item === selectedFilm.id then get that index
    const indexOfSelectedFilm = this.favoriteMoviesArray.findIndex(
      (film) => film.id === selectedFilm.id
    );

    // if this id is in the array then remove it. If we get -1 then there is no such item in the array and do nothing
    if (indexOfSelectedFilm !== -1) {
      this.favoriteMoviesArray.splice(indexOfSelectedFilm, 1);

      // Pass the new array into the subject to update the DOM.
      this.updatedFavoriteMoviesArraySubject.next(this.favoriteMoviesArray);
    }

    return this.favoriteMoviesArray;
  }

  // we call this method when we get to the Favorite component. It only gets called if there are items inside the local storage
  storeLocalStorageItemsInsideFavoritesArrayOnRefresh(
    arrayFromLocalStorage: TrendingFilm[]
  ): void {
    this.favoriteMoviesArray = arrayFromLocalStorage;
  }

  // get the array of liked movies
  getLikedMovies() {
    return this.favoriteMoviesArray.slice();
  }
}
