import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private supabaseService = inject(SupabaseService);
  router = inject(Router);
  async logout(): Promise<void> {
    await this.supabaseService.logout();
    this.router.navigate(['/login']); 
  }
}
