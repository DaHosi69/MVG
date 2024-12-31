import {Component, inject, output, signal} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router);
  email = signal<string>("");
  password = signal<string>("");
  errorMessage: string | null = null;
  isPasswordVisible = signal<boolean>(false);

  async login(): Promise<void> {
    try {
      this.errorMessage = null; 
      await this.supabaseService.login(this.email(), this.password());
      this.router.navigate(['/overview']); 
    } catch (error: any) {
      if (error.message === 'Invalid login credentials') {
        this.errorMessage = 'Falsche Email oder falsches Passwort!';
      } else if (error.message === 'missing email or phone') {
        this.errorMessage = 'Gib deine Email-Adresse und dein Passwort ein!';
      } else {
        this.errorMessage = 'OOOPS! Etwas scheint nicht zu funktionieren.';
      }
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
  
}
