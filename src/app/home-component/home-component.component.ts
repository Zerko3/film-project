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

  dataSource;
  slideshowDelay: number = 3500;

  constructor(private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // get trending data from API on component load
    this.dataStorage.getTrendingFilms();

    // subscribe to subject
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
}
