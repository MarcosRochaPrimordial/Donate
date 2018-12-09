import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {}

  get CompleteNameUser(): string | boolean {
    let user = JSON.parse(localStorage.getItem("API_KEY"));
    if(!user) {
      return false;
    }
    return user.completeName.split(" ")[0];
  }

  logout() {
    localStorage.removeItem("API_KEY");
    this.router.navigate(['/credentials']);
  }
}
