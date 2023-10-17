import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseDataForTrandingMovies } from 'src/interfaces/responseData.interface';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  // subject
  trendingMoviesSubject = new Subject<TrendingFilm[]>();

  // cache data

  constructor(private http: HttpClient) {}

  // will use this for specigic movie -> this will be called on click
  getSpecificMovieDetails() {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/575264?api_key=${environment._API_KEY}&language=en-US`
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  // will use this for the showing of trending -> this will be called on init
  getTrendingFilms() {
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

        // pass the data into the subject to get it on the DOM
        this.trendingMoviesSubject.next(responseData.results);
      });
  }
}
