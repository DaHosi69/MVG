import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import { SupabaseService } from '../../../../services/supabase.service';
import { Router } from '@angular/router';
import { ConcertDto } from '../../../../models/ConcertDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [DatePipe],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  private router = inject(Router);
  concert = input.required<ConcertDto>();
  concertToDelete = output<ConcertDto>();
  supabaseService = inject(SupabaseService);
  occupiedSeats = signal<number>(0);
  protected readonly Math = Math;
 
  ngOnInit(): void {
    this.fetchOccupiedSeats();
  }

  getDayOfWeek(date: string): string{
    const weekday = new Date(date).toLocaleDateString("de-AT", { weekday: "long" });
    return weekday;
  }

  async fetchOccupiedSeats() {
    try {
      const count = await this.supabaseService.getOccupiedSeatsCount(this.concert().id);
      this.occupiedSeats.set(Number(count) || 0);
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
      this.occupiedSeats.set(0);
    }
  }

  viewSeats() {
    this.router.navigateByUrl(`/reservations/${this.concert().id}`);
  }

  updateConcertToDelete() {
    this.concertToDelete.emit(this.concert());
  }
}
