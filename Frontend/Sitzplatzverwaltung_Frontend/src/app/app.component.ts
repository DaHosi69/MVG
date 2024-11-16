import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sitzplatzverwaltung_Frontend';
  isLoggedIn :boolean = false;

  loggedIn($event: boolean) {
    this.isLoggedIn = $event;
  }
}
