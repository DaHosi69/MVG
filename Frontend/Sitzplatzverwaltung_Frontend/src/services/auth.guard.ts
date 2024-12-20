import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
router = inject(Router);
supabaseService = inject(SupabaseService);

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.supabaseService.isAuthenticated();
    if (isAuthenticated) {
      return true; 
    } else {
        this.router.navigate(['/login']); 
      return false;
    }
  }
}
