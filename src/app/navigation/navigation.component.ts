import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private router: Router) {}

  // allows user to navigate via Router
  onUserNavigate(e: any) {
    if (e.target.textContent === 'Home') {
      this.router.navigate(['']);
    } else if (e.target.textContent === 'Favorite films') {
      this.router.navigate(['home/favoriteFilms']);
    }
  }
}
