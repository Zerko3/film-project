import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/services/data-storage.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent implements OnInit {
  constructor(private dataStorage: DataStorage) {}

  ngOnInit(): void {
    // get trending data from API on component load
    this.dataStorage.getTrendingFilms();

    // specific movie
    this.dataStorage.getSpecificMovieDetails();
  }
}
