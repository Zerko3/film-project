import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseDataForTrandingMovies } from 'src/interfaces/responseData.interface';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';
import { DataStorage } from 'src/services/data-storage.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  trendingMoviesSubscribe: Subscription;

  dataSource: TrendingFilm[] = [];
  slideshowDelay: number = 3500;

  constructor(private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // get trending data from API on component load
    this.dataStorage.getTrendingFilms();

    // get cache data from service -> refactor this
    this.dataSource = this.dataStorage.getCacheData();

    // subscribe to subject
    this.trendingMoviesSubscribe =
      this.dataStorage.trendingMoviesSubject.subscribe(
        (responseData: TrendingFilm[]) => {
          console.log(responseData);

          this.dataSource = responseData;
        }
      );

    // specific movie
    // this.dataStorage.getSpecificMovieDetails();
  }

  // unsubscribe from observables
  ngOnDestroy(): void {
    this.trendingMoviesSubscribe.unsubscribe();
  }

  // get the object of the trending film and pass it to the API
  getFilmDataOnUserClick(e) {
    console.log(e);
  }
}
