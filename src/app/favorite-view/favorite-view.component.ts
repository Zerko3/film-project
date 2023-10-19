import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import {
  AdditionalInfoForTrendingFilm,
  TrendingFilm,
} from 'src/interfaces/trendingFilm.interface';
import { DataStorage } from 'src/services/data-storage.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.scss'],
})
export class FavoriteViewComponent implements OnInit, OnDestroy {
  // arrays
  favoriteMoviesArray: TrendingFilm[] = [];
  searchResultsArray: TrendingFilm[] = [];

  // boolean values
  popupVisible: boolean = false;
  searchSidebarOpenStatus: boolean = false;

  // used for devextreme to get the info on the film when user clicks the icon
  selectedFilm: AdditionalInfoForTrendingFilm;

  // Subscription elements
  additionalInfoSubscribe: Subscription;
  updateFavoriteArraySubscribe: Subscription;
  searchMoviesSubscribe: Subscription;
  errorSubscribe: Subscription;

  // toast - devextreme element
  isVisible: boolean = false;
  type: string = '';
  message: string = '';

  constructor(private state: State, private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // Get data from local storage if there are any items in there
    const storedLikedMovies = JSON.parse(
      localStorage.getItem('storedLikedMovies')
    );
    if (storedLikedMovies && storedLikedMovies.length > 0) {
      this.favoriteMoviesArray = this.dataStorage.getDataFromLocalStorage();

      // Pass the array from local storage inside the state. We need this to remove items if we want to.
      this.state.storeLocalStorageItemsInsideFavoritesArrayOnRefresh(
        this.favoriteMoviesArray
      );
    } else {
      // Handle the case when there's nothing in local storage
      this.favoriteMoviesArray = this.state.getLikedMovies();
    }

    this.updateFavoriteArraySubscribe =
      this.state.updatedFavoriteMoviesArraySubject.subscribe(
        (responseData: TrendingFilm[]) => {
          this.favoriteMoviesArray = responseData;

          // update the local storage here. We get this data from onUserDeleteFilm() method in this component, the data goes to our state where the array removes the selected film and we subscribe to the change here (needs to load on the DOM as soon as the user clicks the "remove button") for better UX
          this.dataStorage.storeDataIntoLocalStorage(this.favoriteMoviesArray);
        }
      );

    // we subscribe to the click so we see the popup as soon as the user clicks for better UX.
    this.additionalInfoSubscribe =
      this.dataStorage.additionalInfoSubject.subscribe(
        (responseData: AdditionalInfoForTrendingFilm) => {
          // set the popup visible to true to render it on the DOM
          this.popupVisible = true;

          // here we set the element data to be displayed.
          this.selectedFilm = responseData;
        }
      );

    // error handle the API
    this.errorSubscribe = this.dataStorage.errorSubject.subscribe(
      (errorMsg: HttpErrorResponse) => {
        // handle here
        this.isVisible = true;
        this.message = `${errorMsg.error.status_message}. Please refresh the page. If the error persists, call our support.`;
        this.type = errorMsg ? 'error' : 'success';
      }
    );

    // we subscribe to the search so when the user wants to search for a film in the favorites component and if he clicks on the add to favorite button it will show on the screen as soon as the user click for better UX.s
    this.searchMoviesSubscribe = this.dataStorage.searchMovieSubject.subscribe(
      (responseData: TrendingFilm[]) => {
        this.searchResultsArray = responseData;

        this.searchSidebarOpenStatus = true;
      }
    );
  }

  // when we go leave the component destroy the observables so we dont have memory leaks
  ngOnDestroy(): void {
    this.additionalInfoSubscribe.unsubscribe();
    this.updateFavoriteArraySubscribe.unsubscribe();
    this.searchMoviesSubscribe.unsubscribe();
    this.errorSubscribe.unsubscribe();
  }

  // pass the selcted item into the state to delete it
  onUserDeleteFilm(deletedFilm: TrendingFilm): void {
    this.state.removeAfilmFromFavoritesArray(deletedFilm);
  }

  onUserClickGetAdditionalInfo(selectedFilm: TrendingFilm) {
    // pass the selected film into the api
    this.dataStorage.getSpecificMovieDetails(selectedFilm.id);
  }

  // toggle the side view
  onClickCloseSearchWindow() {
    this.searchSidebarOpenStatus = false;
  }
}
