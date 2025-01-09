import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConcertDto } from '../../../../models/ConcertDto';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { CardComponent } from '../card/card.component';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";

@Component({
  selector: 'app-overview',
  imports: [FormsModule, CardComponent, SidebarComponent, BottomNavbarComponent],
  templateUrl: './overview.component.html',
  standalone: true,
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  supabaseService = inject(SupabaseService);
  concerts = signal<ConcertDto[]>([]);
  concertToDelete = signal<ConcertDto>({
    id: 0,
    name: '',
    date: '',
    total_seats: 0,
    seat_rows: 0,
  });
  isSmartphone = signal(false);

  ngOnInit() {
    this.supabaseService.getConcerts().then((x) => this.concerts.set(x));
    this.isSmartphone.set(window.innerWidth <= 480);
    console.log(this.supabaseService.currentUser?.role);
    
  }


  isAdmin(): boolean {
    return false;
  }

  async deleteConcert(): Promise<void> {
    try {
      await this.supabaseService.deleteConcert(this.concertToDelete().id);
      console.log('Concert deleted successfully!');
    } catch (error) {
      console.error('Error deleting concert:', error);
    }
    window.location.reload();
  }

  setConcertToDelete(concert: ConcertDto) {
    this.concertToDelete.set(concert);
  }
}
