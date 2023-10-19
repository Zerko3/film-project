import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseDataForTrandingMovies } from 'src/interfaces/responseData.interface';
import { SearchData } from 'src/interfaces/searchData.interface';
import {
  AdditionalInfoForTrendingFilm,
  TrendingFilm,
} from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  // subject - will get an array
  trendingMoviesSubject = new Subject<TrendingFilm[]>();
  searchMovieSubject = new Subject<any>();
  errorSubject = new Subject<HttpErrorResponse>();
  additionalInfoSubject = new Subject<any>();

  // cache data
  cacheForTrendingMovies: TrendingFilm[] = [];
  favoriteMoviesArray: TrendingFilm[] = [];

  // error status
  errorStatus: boolean = false;

  constructor(private http: HttpClient) {}

  // search api end point
  getMovieFromSearch(userSearchMovie: string): SearchData | Subscription {
    return this.http
      .get<SearchData>(
        `https://api.themoviedb.org/3/search/movie?query=${userSearchMovie}&api_key=${environment.API_KEY}`,
        {
          params: new HttpParams().set('auth', environment.AUTH_TOKEN),
        }
      )
      .subscribe(
        (responseData: SearchData) => {
          // Filter out objects with null backdrop_path. We need this since some dont have imgs and it wont look good for the user if we dont do this here.
          const filteredResults = responseData.results.filter(
            (result) => result.backdrop_path !== null
          );

          // pass into the subject we will get this data in the home
          this.searchMovieSubject.next(filteredResults);
        },
        (error: HttpErrorResponse) => {
          // pass the error subject into the home component when search view is open
          this.errorSubject.next(error);
        }
      );
  }

  // will use this for specigic movie -> this will be called on click
  getSpecificMovieDetails(movieId: number) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${environment.API_KEY}&language=en-US`,
        {
          params: new HttpParams().set('auth', environment.AUTH_TOKEN),
        }
      )
      .subscribe(
        (responseData: AdditionalInfoForTrendingFilm) => {
          this.additionalInfoSubject.next(responseData);
        },
        (error: HttpErrorResponse) => {
          // pass the error subject into the home component
          this.errorSubject.next(error);
        }
      );
  }

  // will use this for the showing of trending -> this will be called on init
  getTrendingFilms():
    | ResponseDataForTrandingMovies
    | Subscription
    | TrendingFilm[] {
    // guard clause so we dont call the API every time we render the home component
    if (this.cacheForTrendingMovies.length > 0) {
      return this.cacheForTrendingMovies;
    }

    return this.http
      .get<ResponseDataForTrandingMovies>(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${environment.API_KEY}`,
        {
          params: new HttpParams().set('auth', environment.AUTH_TOKEN),
        }
      )
      .subscribe(
        (responseData: ResponseDataForTrandingMovies) => {
          // store cache so we dont call the API every time we go to home component
          this.cacheForTrendingMovies = responseData.results;

          // pass the data into the subject to get it on the DOM
          this.trendingMoviesSubject.next(responseData.results);
        },
        (error: HttpErrorResponse) => {
          // pass the error subject into the home component
          this.errorSubject.next(error);
        }
      );
  }

  // we call this method to set the data in the local storage
  storeDataIntoLocalStorage(films: TrendingFilm[]): void {
    localStorage.setItem('storedLikedMovies', JSON.stringify(films));
  }

  getDataFromLocalStorage(): TrendingFilm[] {
    this.favoriteMoviesArray = JSON.parse(
      localStorage.getItem('storedLikedMovies')
    );

    return this.favoriteMoviesArray;
  }

  getCacheData(): TrendingFilm[] {
    return this.cacheForTrendingMovies;
  }
}
