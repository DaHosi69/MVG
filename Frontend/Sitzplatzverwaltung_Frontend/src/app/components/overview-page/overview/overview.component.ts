import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConcertDto } from '../../../../models/ConcertDto';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { CardComponent } from '../card/card.component';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { computedAsync } from '../../../shared/angular-extension';
import { from, Observable } from 'rxjs';
import { UserDto } from '../../../../models/UserDto';

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
  concertToDelete = signal<ConcertDto | null>(null);
  concertInfo = signal<ConcertDto | null>(null);
  concertInfoOccupiedSeats = signal<number>(0);
  isSmartphone = signal(false);
  role = computedAsync( () => from(this.supabaseService.getCurrentUser()) as Observable<UserDto>);
 
  async ngOnInit(): Promise<void> {
    this.supabaseService.getConcerts().then((x) => this.concerts.set(x));
    this.isSmartphone.set(window.innerWidth <= 480);
    await this.supabaseService.loadCurrentUser();
    console.log(this.supabaseService.currentUser?.user_metadata.role);
  }

  isAdmin(): boolean {
    return false;
  }

  async deleteConcert(): Promise<void> {
    try {
      await this.supabaseService.deleteConcert(this.concertToDelete()!.id);
      console.log('Concert deleted successfully!');
    } catch (error) {
      console.error('Error deleting concert:', error);
    }
    window.location.reload();
  }

  setConcertToDelete(concert: ConcertDto) {
    this.concertToDelete.set(concert);
  }

  setConcertInfo(concert: ConcertDto){
    this.concertInfo.set(concert);
    this.fetchOccupiedSeats();
    console.log('in SetConcertInfo');
  }

  async fetchOccupiedSeats() {
    try {
       this.concertInfoOccupiedSeats.set(await this.supabaseService.getOccupiedSeatsCount(this.concertInfo()!.id));
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
    }
  }
}
