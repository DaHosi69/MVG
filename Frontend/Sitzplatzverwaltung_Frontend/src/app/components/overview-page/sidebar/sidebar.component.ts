import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
router = inject(Router);
supabaseService = inject(SupabaseService);

  async logout(): Promise<void> {
    await this.supabaseService.logout();
    this.router.navigate(['/login']); 
  }
}
