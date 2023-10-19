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
  favoriteMoviesArray: TrendingFilm[] = [];

  popupVisible: boolean = false;
  selectedFilm: AdditionalInfoForTrendingFilm;

  additionalInfoSubscribe: Subscription;
  updateFavoriteArraySubscribe: Subscription;

  // toast
  isVisible: boolean = false;
  type: string = '';
  message: string = '';

  constructor(private state: State, private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // get data from the local storag if there are any items in there
    if (JSON.parse(localStorage.getItem('storedLikedMovies')).length > 0) {
      this.favoriteMoviesArray = this.dataStorage.getDataFromLocalStorage();

      // pass the array from local storage inside the state. We need this to remove items if we want to.
      this.state.storeLocalStorageItemsInsideFavoritesArrayOnRefresh(
        this.favoriteMoviesArray
      );
    } else {
      // get favorite films on init
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

    this.additionalInfoSubscribe =
      this.dataStorage.additionalInfoSubject.subscribe(
        (responseData: AdditionalInfoForTrendingFilm) => {
          console.log(responseData);

          this.popupVisible = true;

          this.selectedFilm = responseData;
        }
      );

    // error handle the API
    this.dataStorage.errorSubject
      .pipe(take(1))
      .subscribe((errorMsg: HttpErrorResponse) => {
        console.log(errorMsg);

        // handle here
        this.isVisible = true;
        this.message = `${errorMsg.error.status_message}. Please refresh the page. If the error persists, call our support.`;
        this.type = errorMsg ? 'error' : 'success';
      });
  }

  ngOnDestroy(): void {
    this.additionalInfoSubscribe.unsubscribe();
    this.updateFavoriteArraySubscribe.unsubscribe();
  }

  // pass the selcted item into the state to delete it
  onUserDeleteFilm(deletedFilm: TrendingFilm): void {
    this.state.removeAfilmFromFavoritesArray(deletedFilm);
  }

  onUserClickGetAdditionalInfo(selectedFilm: TrendingFilm) {
    // pass the selected film into the api
    this.dataStorage.getSpecificMovieDetails(selectedFilm.id);
  }
}
