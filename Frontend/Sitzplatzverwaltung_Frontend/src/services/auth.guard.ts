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
    try {
      const user = await this.supabaseService.getCurrentUser();
      return !!user; 
    } catch (error) {
      console.error('AuthGuard: User is not authenticated. Redirecting to /login');
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
