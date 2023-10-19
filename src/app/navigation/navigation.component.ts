import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorage } from 'src/services/data-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  movieSearchData: {
    movieName: string;
  } = {
    movieName: '',
  };

  buttonOptions: any = {
    text: 'Search',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(private router: Router, private dataStorage: DataStorage) {}
  @ViewChild('form') formComponent: NgForm;

  // allows user to navigate via Router
  onUserNavigate(e: any) {
    if (e.target.textContent === 'Home') {
      this.router.navigate(['']);
    } else if (e.target.textContent === 'Favorite films') {
      this.router.navigate(['favoriteFilms']);
    }
  }

  // on user submit get the data and pass it into the API
  onUserSearchSubmit() {
    if (this.formComponent.status === 'VALID') {
      let movieName = this.formComponent.form.value.movieName;

      console.log(movieName);

      // pass the string into the API so we get data back
      this.dataStorage.getMovieFromSearch(movieName);
    }
    // reset the form for better UX
    this.formComponent.reset();
  }
}
