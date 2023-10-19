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
  trendingMoviesSubscribe: Subscription;

  dataSource: TrendingFilm[] = [];
  searchResultsArray: TrendingFilm[] = [];
  slideshowDelay: number = 3500;

  // boolean
  searchSidebarOpenStatus: boolean;

  // toast
  isVisible: boolean = false;
  type: string = '';
  message: string = '';

  constructor(private dataStorage: DataStorage, private state: State) {}

  ngOnInit(): void {
    // get trending data from API on component load
    this.dataStorage.getTrendingFilms();

    // get cache data from service -> refactor this
    this.dataSource = this.dataStorage.getCacheData();

    // subscribe to subject from the API component we call in this comonent on init
    this.trendingMoviesSubscribe =
      this.dataStorage.trendingMoviesSubject.subscribe(
        (responseData: TrendingFilm[]) => {
          console.log(responseData);

          // pass the data into the array to display it
          this.dataSource = responseData;
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

    // specific movie
    // this.dataStorage.getSpecificMovieDetails();

    this.dataStorage.searchMovieSubject.subscribe(
      (responseData: TrendingFilm[]) => {
        this.searchResultsArray = responseData;
        console.log(this.searchResultsArray);

        this.searchSidebarOpenStatus = true;
      }
    );
  }

  // unsubscribe from observables
  ngOnDestroy(): void {
    this.trendingMoviesSubscribe.unsubscribe();
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
