import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseDataForTrandingMovies } from 'src/interfaces/responseData.interface';
import { SearchData } from 'src/interfaces/searchData.interface';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  // subject - will get an array
  trendingMoviesSubject = new Subject<TrendingFilm[]>();
  searchMovieSubject = new Subject<any>();

  // cache data
  cacheForTrendingMovies: TrendingFilm[] = [];

  constructor(private http: HttpClient) {}

  // search api end point
  getMovieFromSearch(userSearchMovie: string) {
    console.log(userSearchMovie);
    return this.http
      .get<SearchData>(
        `https://api.themoviedb.org/3/search/movie?query=${userSearchMovie}&api_key=${environment._API_KEY}`,
        {
          params: new HttpParams().set('auth', environment._AUTH_TOKEN),
        }
      )
      .subscribe((responseData: SearchData) => {
        console.log(responseData.results);
        // pass into the subject we will get this data in the home
        this.searchMovieSubject.next(responseData.results);
      });
  }

  // will use this for specigic movie -> this will be called on click
  getSpecificMovieDetails() {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/575264?api_key=${environment._API_KEY}&language=en-US`,
        {
          params: new HttpParams().set('auth', environment._AUTH_TOKEN),
        }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  // will use this for the showing of trending -> this will be called on init
  getTrendingFilms() {
    // guard clause so we dont call the API every time we render the home component
    if (this.cacheForTrendingMovies.length > 0) {
      // ...
      console.log('WE HAVE DATA IN CACHE!');
      console.log(this.cacheForTrendingMovies);
      return this.cacheForTrendingMovies;
    }

    return this.http
      .get<ResponseDataForTrandingMovies>(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${environment._API_KEY}`,
        {
          params: new HttpParams().set('auth', environment._AUTH_TOKEN),
        }
      )
      .subscribe((responseData: ResponseDataForTrandingMovies) => {
        // console.log(responseData);
        console.log(responseData.results);

        // store cache so we dont call the API every time we go to home component
        this.cacheForTrendingMovies = responseData.results;

        // pass the data into the subject to get it on the DOM
        this.trendingMoviesSubject.next(responseData.results);
      });
  }

  getCacheData() {
    return this.cacheForTrendingMovies;
  }
}
