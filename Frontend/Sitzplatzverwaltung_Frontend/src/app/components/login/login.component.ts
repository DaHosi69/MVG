import {Component, inject, output} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  isLoggedIn = output<boolean>();
  email: string = "";
  password: string = "";

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.isLoggedIn.emit(true);
    this.router.navigate(['/overview']);
  }
}
