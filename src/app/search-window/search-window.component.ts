import { Component, Input } from '@angular/core';
import { TrendingFilm } from 'src/interfaces/trendingFilm.interface';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.scss'],
})
export class SearchWindowComponent {
  @Input() searchResultsArray: TrendingFilm[];

  // boolean
  searchSidebarOpenStatus: boolean;

  constructor(private state: State) {}

  // close the search sidebar
  onClickCloseSearchWindow(): void {
    this.searchSidebarOpenStatus = false;
  }

  // get the object of the trending film and pass it to the state -> here we will get the data inside the local storage
  getFilmDataOnUserClick(targetedMovie: TrendingFilm): void {
    this.state.storeLikedMoviesOnUserClick(targetedMovie);
  }
}
