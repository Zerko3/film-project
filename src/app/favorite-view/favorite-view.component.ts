import { Component, OnInit } from '@angular/core';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';
import { DataStorage } from 'src/services/data-storage.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.scss'],
})
export class FavoriteViewComponent implements OnInit {
  favoriteMoviesArray: TrendingFilm[] = [];
  constructor(private state: State, private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // get favorite films on init
    this.favoriteMoviesArray = this.state.getLikedMovies();
    console.log(this.favoriteMoviesArray);

    this.favoriteMoviesArray = this.dataStorage.getDataFromLocalStorage();

    this.state.updatedFavoriteMoviesArraySubject.subscribe(
      (responseData: TrendingFilm[]) => {
        this.favoriteMoviesArray = responseData;

        // update the local storage here. We get this data from onUserDeleteFilm() method in this component, the data goes to our state where the array removes the selected film and we subscribe to the change here (needs to load on the DOM as soon as the user clicks the "remove button") for better UX
        this.dataStorage.storeDataIntoLocalStorage(responseData);
      }
    );
  }

  // pass the selcted item into the state to delete it
  onUserDeleteFilm(deletedFilm: TrendingFilm): void {
    this.state.removeAfilmFromFavoritesArray(deletedFilm);
  }
}
