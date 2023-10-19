import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';
import { DataStorage } from 'src/services/data-storage.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  // Subscriptions
  trendingMoviesSubscribe: Subscription;
  searchMoviesSubscribe: Subscription;

  // arrays
  dataSource: TrendingFilm[] = [];
  searchResultsArray: TrendingFilm[] = [];

  // devextreme gallery timer
  slideshowDelay: number = 3500;

  // boolean
  searchSidebarOpenStatus: boolean;

  // toast - devextreme element
  isVisible: boolean = false;
  type: string = '';
  message: string = '';

  constructor(private dataStorage: DataStorage, private state: State) {}

  ngOnInit(): void {
    // get trending data from API on component load
    this.dataStorage.getTrendingFilms();

    // get cache data from service if we have any
    this.dataSource = this.dataStorage.getCacheData();

    // subscribe to subject from the API component we call in this component on init
    this.trendingMoviesSubscribe =
      this.dataStorage.trendingMoviesSubject.subscribe(
        (responseData: TrendingFilm[]) => {
          // pass the data into the array to display it
          this.dataSource = responseData;
        }
      );

    // error handle the API. Since we use pipe(take(1)) we dont need to unsubscribe here. We use it since we dont care for more than one error msg and when we get it we dont need to subscribe to it anymore
    this.dataStorage.errorSubject
      .pipe(take(1))
      .subscribe((errorMsg: HttpErrorResponse) => {
        // handle here
        this.isVisible = true;
        this.message = `${errorMsg.error.status_message}. Please refresh the page. If the error persists, call our support.`;
        this.type = errorMsg ? 'error' : 'success';
      });

    // subscribe to the search subject, so as soon as we search some move we will get it displayed on the DOM.
    this.searchMoviesSubscribe = this.dataStorage.searchMovieSubject.subscribe(
      (responseData: TrendingFilm[]) => {
        this.searchResultsArray = responseData;

        this.searchSidebarOpenStatus = true;
      }
    );
  }

  // unsubscribe from observables
  ngOnDestroy(): void {
    this.trendingMoviesSubscribe.unsubscribe();
    this.searchMoviesSubscribe.unsubscribe();
  }

  // close the search sidebar
  onClickCloseSearchWindow(): void {
    this.searchSidebarOpenStatus = false;
  }

  // get the object of the trending film and pass it to the state -> here we will get the data inside the local storage
  getFilmDataOnUserClick(targetedMovie: TrendingFilm): void {
    this.state.storeLikedMoviesOnUserClick(targetedMovie);
  }
}
